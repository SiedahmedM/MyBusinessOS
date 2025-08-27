-- Create tables for MyBusinessOS Production Database
-- This schema supports the enhanced AI Playground and production features

-- Demo requests (updated with app type support)
CREATE TABLE demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  business_type TEXT NOT NULL,
  app_type TEXT CHECK (app_type IN ('mobile', 'web')) DEFAULT 'mobile',
  description TEXT,
  demo_url TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact leads (enhanced with lead scoring)
CREATE TABLE contact_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_type TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'lost')),
  lead_score INTEGER DEFAULT 0,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROI calculations (enhanced with session tracking)
CREATE TABLE roi_calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT,
  calculator_type TEXT NOT NULL CHECK (calculator_type IN ('time', 'revenue', 'cost')),
  input_values JSONB NOT NULL,
  results JSONB NOT NULL,
  business_type TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI chat sessions (new table for chat persistence)
CREATE TABLE chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  business_type TEXT,
  messages JSONB DEFAULT '[]'::jsonb,
  app_type TEXT CHECK (app_type IN ('mobile', 'web')),
  completion_status TEXT DEFAULT 'active' CHECK (completion_status IN ('active', 'completed', 'abandoned')),
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email subscriptions (new table for lead nurturing)
CREATE TABLE email_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  business_type TEXT,
  demo_id UUID REFERENCES demo_requests(id),
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  confirmation_token TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE
);

-- Analytics events (new table for tracking user behavior)
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rate limiting (new table for API rate limiting)
CREATE TABLE rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ip_address, endpoint, window_start)
);

-- Error logs (new table for error tracking)
CREATE TABLE error_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  error_type TEXT NOT NULL,
  error_message TEXT NOT NULL,
  stack_trace TEXT,
  user_session TEXT,
  user_agent TEXT,
  ip_address INET,
  request_data JSONB DEFAULT '{}'::jsonb,
  severity TEXT DEFAULT 'error' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) - Enable for all tables
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Policies for public access (adjust based on security requirements)
-- Demo requests - allow public insert
CREATE POLICY "Enable insert for demo_requests" ON demo_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for demo_requests by session" ON demo_requests FOR SELECT USING (session_id = current_setting('myapp.current_session_id', true));

-- Contact leads - allow public insert
CREATE POLICY "Enable insert for contact_leads" ON contact_leads FOR INSERT WITH CHECK (true);

-- ROI calculations - allow public insert
CREATE POLICY "Enable insert for roi_calculations" ON roi_calculations FOR INSERT WITH CHECK (true);

-- Chat sessions - allow public insert and update by session
CREATE POLICY "Enable insert for chat_sessions" ON chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for chat_sessions by session" ON chat_sessions FOR UPDATE USING (session_id = current_setting('myapp.current_session_id', true));
CREATE POLICY "Enable select for chat_sessions by session" ON chat_sessions FOR SELECT USING (session_id = current_setting('myapp.current_session_id', true));

-- Email subscriptions - allow public insert
CREATE POLICY "Enable insert for email_subscriptions" ON email_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for email_subscriptions by email" ON email_subscriptions FOR UPDATE USING (email = current_setting('myapp.current_email', true));

-- Analytics events - allow public insert
CREATE POLICY "Enable insert for analytics_events" ON analytics_events FOR INSERT WITH CHECK (true);

-- Rate limits - allow public select and upsert
CREATE POLICY "Enable select for rate_limits by ip" ON rate_limits FOR SELECT USING (ip_address = inet_client_addr());
CREATE POLICY "Enable insert for rate_limits" ON rate_limits FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for rate_limits by ip" ON rate_limits FOR UPDATE USING (ip_address = inet_client_addr());

-- Error logs - allow public insert (for client-side error reporting)
CREATE POLICY "Enable insert for error_logs" ON error_logs FOR INSERT WITH CHECK (true);

-- Indexes for performance optimization
CREATE INDEX idx_demo_requests_session_id ON demo_requests(session_id);
CREATE INDEX idx_demo_requests_business_type ON demo_requests(business_type);
CREATE INDEX idx_demo_requests_created_at ON demo_requests(created_at);
CREATE INDEX idx_demo_requests_ip_address ON demo_requests(ip_address);

CREATE INDEX idx_contact_leads_email ON contact_leads(email);
CREATE INDEX idx_contact_leads_created_at ON contact_leads(created_at);
CREATE INDEX idx_contact_leads_status ON contact_leads(status);
CREATE INDEX idx_contact_leads_lead_score ON contact_leads(lead_score);

CREATE INDEX idx_roi_calculations_session_id ON roi_calculations(session_id);
CREATE INDEX idx_roi_calculations_business_type ON roi_calculations(business_type);
CREATE INDEX idx_roi_calculations_created_at ON roi_calculations(created_at);

CREATE INDEX idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX idx_chat_sessions_business_type ON chat_sessions(business_type);
CREATE INDEX idx_chat_sessions_created_at ON chat_sessions(created_at);
CREATE INDEX idx_chat_sessions_completion_status ON chat_sessions(completion_status);

CREATE INDEX idx_email_subscriptions_email ON email_subscriptions(email);
CREATE INDEX idx_email_subscriptions_status ON email_subscriptions(status);
CREATE INDEX idx_email_subscriptions_business_type ON email_subscriptions(business_type);

CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);

CREATE INDEX idx_rate_limits_ip_endpoint ON rate_limits(ip_address, endpoint);
CREATE INDEX idx_rate_limits_window_start ON rate_limits(window_start);

CREATE INDEX idx_error_logs_created_at ON error_logs(created_at);
CREATE INDEX idx_error_logs_severity ON error_logs(severity);
CREATE INDEX idx_error_logs_resolved ON error_logs(resolved);

-- Functions for common operations

-- Function to clean up old rate limit entries
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits 
  WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;

-- Function to update lead scores based on engagement
CREATE OR REPLACE FUNCTION update_lead_score(lead_id UUID, score_increment INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE contact_leads 
  SET lead_score = lead_score + score_increment,
      updated_at = NOW()
  WHERE id = lead_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get session analytics
CREATE OR REPLACE FUNCTION get_session_analytics(session_id_param TEXT)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'session_id', session_id_param,
    'events', jsonb_agg(
      jsonb_build_object(
        'event_name', event_name,
        'event_data', event_data,
        'created_at', created_at
      ) ORDER BY created_at
    ),
    'total_events', COUNT(*),
    'session_duration', EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))),
    'first_event', MIN(created_at),
    'last_event', MAX(created_at)
  )
  INTO result
  FROM analytics_events 
  WHERE session_id = session_id_param;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers to tables with updated_at columns
CREATE TRIGGER update_demo_requests_updated_at BEFORE UPDATE ON demo_requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_leads_updated_at BEFORE UPDATE ON contact_leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON chat_sessions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Views for common queries

-- Active chat sessions view
CREATE VIEW active_chat_sessions AS
SELECT 
  id,
  session_id,
  business_type,
  app_type,
  jsonb_array_length(messages) as message_count,
  created_at,
  updated_at
FROM chat_sessions 
WHERE completion_status = 'active'
AND updated_at > NOW() - INTERVAL '24 hours';

-- Lead pipeline view
CREATE VIEW lead_pipeline AS
SELECT 
  status,
  COUNT(*) as count,
  AVG(lead_score) as avg_score,
  business_type
FROM contact_leads 
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY status, business_type;

-- Business type popularity view
CREATE VIEW business_type_stats AS
SELECT 
  business_type,
  COUNT(*) as total_requests,
  COUNT(CASE WHEN app_type = 'mobile' THEN 1 END) as mobile_requests,
  COUNT(CASE WHEN app_type = 'web' THEN 1 END) as web_requests,
  AVG(CASE WHEN demo_url IS NOT NULL THEN 1.0 ELSE 0.0 END) as completion_rate
FROM demo_requests 
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY business_type
ORDER BY total_requests DESC;

-- Comments for documentation
COMMENT ON TABLE demo_requests IS 'Tracks demo app building requests with app type selection';
COMMENT ON TABLE contact_leads IS 'Stores contact form submissions with lead scoring';
COMMENT ON TABLE roi_calculations IS 'Records ROI calculator usage and results';
COMMENT ON TABLE chat_sessions IS 'Persists AI chat conversations for continuity';
COMMENT ON TABLE email_subscriptions IS 'Manages email newsletter subscriptions';
COMMENT ON TABLE analytics_events IS 'Tracks user interactions and behavior';
COMMENT ON TABLE rate_limits IS 'Implements API rate limiting by IP address';
COMMENT ON TABLE error_logs IS 'Centralized error logging and monitoring';