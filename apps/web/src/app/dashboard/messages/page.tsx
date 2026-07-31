'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { MessageSquare, Loader2, Send, Users } from 'lucide-react';
import { useAuth } from '../../../lib/auth-context';

interface Conversation { id: string; type: string; title?: string; lastMessage?: { content: string; senderId: string; createdAt: string } | null }
interface Message { id: string; conversationId: string; senderId: string; content: string; createdAt: string }

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [active, setActive] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadConversations = useCallback(async () => {
    const res = await api<Conversation[]>('/v1/messaging/conversations');
    if (res.success && res.data) setConversations(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  const openConversation = async (conv: Conversation) => {
    setActive(conv);
    const res = await api<Message[]>(`/v1/messaging/conversations/${conv.id}/messages`);
    if (res.success && res.data) setMessages(res.data);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!active || !draft.trim()) return;
    setSending(true);
    const res = await api<Message>(`/v1/messaging/conversations/${active.id}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content: draft, messageType: 'text' }),
    });
    setSending(false);
    if (res.success && res.data) {
      setMessages((m) => [...m, res.data as Message]);
      setDraft('');
      await loadConversations();
    }
  };

  const newChat = async () => {
    const res = await api<Conversation>('/v1/messaging/conversations', {
      method: 'POST',
      body: JSON.stringify({ type: 'direct', title: 'New chat' }),
    });
    if (res.success && res.data) {
      await loadConversations();
      await openConversation(res.data);
    }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-1">Chat with instructors, mentors, and peers.</p>
        </div>
        <Button variant="outline" size="sm" onClick={newChat}><Users className="mr-2 h-4 w-4" /> New chat</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
        {/* Conversation list */}
        <div className="rounded-2xl border bg-card overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              No conversations yet. Start a new chat with your instructor or mentor.
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => openConversation(conv)}
                className={`w-full text-left p-4 border-b transition-colors hover:bg-muted/50 ${active?.id === conv.id ? 'bg-muted/60' : ''}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center ${conv.type === 'group' ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-blue-600 to-cyan-500'}`}>
                      {conv.type === 'group' ? <Users className="h-4 w-4 text-white" /> : <MessageSquare className="h-4 w-4 text-white" />}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{conv.title || conv.type === 'group' ? 'Group chat' : 'Chat'}</div>
                      <div className="text-xs text-muted-foreground truncate">{conv.lastMessage?.content ?? 'No messages yet'}</div>
                    </div>
                  </div>
                  {conv.lastMessage && (
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Thread */}
        <div className="lg:col-span-2 rounded-2xl border bg-card flex flex-col overflow-hidden">
          {!active ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-3" />
                <p className="text-sm">Select a conversation to start messaging</p>
              </div>
            </div>
          ) : (
            <>
              <div className="border-b p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{active.title || (active.type === 'group' ? 'Group chat' : 'Chat')}</div>
                  <div className="text-xs text-muted-foreground">{active.type}</div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div className="text-center text-sm text-muted-foreground py-10">Say hello to start the conversation!</div>
                )}
                {messages.map((msg) => {
                  const mine = msg.senderId === user?.id;
                  return (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${mine ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'}`}>
                        {!mine && <div className="text-xs font-semibold mb-1 text-primary">Them</div>}
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                        <div className={`text-[10px] mt-1 ${mine ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
              <div className="border-t p-3 flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Type a message…"
                  className="flex-1 h-10 rounded-xl border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button onClick={send} disabled={sending || !draft.trim()} className="h-10 px-4">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
