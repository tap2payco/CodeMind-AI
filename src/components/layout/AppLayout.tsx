import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Send, 
  History,
  User,
  Zap,
  Brain
} from 'lucide-react';

const AppLayout = () => {
  const { user, signOut } = useAuth();
  const [activeMode, setActiveMode] = useState<'chat' | 'code'>('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai', content: string }>>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'I understand you want help with coding. I\'m here to assist you with your development tasks!' 
      }]);
    }, 1000);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Code className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">AI Coding Assistant</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={signOut}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border p-4 flex flex-col gap-4 overflow-y-auto">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <History className="w-4 h-4" />
              Recent Conversations
            </h3>
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                >
                  <p className="text-sm text-foreground truncate">
                    React component help #{i}
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Quick Actions
            </h3>
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Brain className="w-4 h-4 mr-2" />
                New Chat
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Code className="w-4 h-4 mr-2" />
                Code Review
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Quick Fix
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mode Selector */}
          <div className="bg-card border-b border-border px-4 py-2">
            <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as 'chat' | 'code')}>
              <TabsList className="grid w-64 grid-cols-2">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {activeMode === 'chat' ? (
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <Card className="w-full max-w-md">
                        <CardHeader className="text-center">
                          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                            <Brain className="w-8 h-8 text-primary" />
                          </div>
                          <CardTitle>Ready to Code!</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-muted-foreground mb-4">
                            I'm your AI coding assistant. Ask me anything about programming, 
                            code review, debugging, or development best practices.
                          </p>
                          <div className="grid grid-cols-1 gap-2 text-sm">
                            <div className="p-2 bg-muted/50 rounded text-left">
                              "Help me debug this React component"
                            </div>
                            <div className="p-2 bg-muted/50 rounded text-left">
                              "Explain this JavaScript concept"
                            </div>
                            <div className="p-2 bg-muted/50 rounded text-left">
                              "Review my code for best practices"
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-3xl p-4 rounded-lg ${
                            msg.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-card border border-border'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ask me anything about coding..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[50px] resize-none"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="px-4"
                      disabled={!message.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex-1 p-4">
                  <Textarea
                    placeholder="Paste your code here for analysis, review, or modification..."
                    className="h-full resize-none font-mono text-sm"
                  />
                </div>
                <div className="border-t border-border p-4 flex justify-end gap-2">
                  <Button variant="outline">
                    Clear
                  </Button>
                  <Button>
                    Analyze Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;