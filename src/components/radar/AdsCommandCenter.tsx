import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, Activity } from 'lucide-react';

interface AdsRadarProps {
  orgId: string;
  jobId?: string;
}

const mockForecastData = [
  { name: 'D-6', actual: 102, forecast: 106 },
  { name: 'D-5', actual: 99, forecast: 103 },
  { name: 'D-4', actual: 105, forecast: 108 },
  { name: 'D-3', actual: 110, forecast: 112 },
  { name: 'D-2', actual: 108, forecast: 115 },
  { name: 'D-1', actual: 112, forecast: 119 },
  { name: 'Today', actual: 116, forecast: 122 },
];

export const AdsCommandCenter = ({ orgId, jobId }: AdsRadarProps) => {
  const [status] = useState<'processing' | 'completed' | 'failed'>('processing');

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#1A1A1A] px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+1rem)] text-white sm:p-6 font-sans">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-fraunces text-[#E85A2A]">Command Center</h1>
        <p className="mt-1 text-sm sm:text-base text-gray-400 font-dm-sans">Org: {orgId}</p>
        {jobId ? (
          <p className="text-xs text-gray-500 font-dm-sans">Job: {jobId}</p>
        ) : null}
        <p className="mt-2 inline-flex rounded-full border border-[#E85A2A]/40 bg-[#E85A2A]/10 px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#E85A2A]">
          Status: {status}
        </p>
      </header>

      <div className="mb-8 sm:mb-10 flex justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-[#E85A2A] shadow-[0_0_20px_rgba(232,90,42,0.3)] sm:h-48 sm:w-48">
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-bold">84</span>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">Health Score</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-[#242424] p-4 sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-base sm:text-lg font-medium">
          <Activity size={18} className="text-[#E85A2A]" />
          7-Model Revenue Forecast
        </h2>
        <div className="h-56 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockForecastData}>
              <defs>
                <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E85A2A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E85A2A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: 'none' }} />
              <Area type="monotone" dataKey="actual" stroke="#ffffff" strokeWidth={2} fill="transparent" />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#E85A2A"
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#colorOrange)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E85A2A] bg-[#E85A2A]/10 p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <AlertTriangle className="mt-0.5 shrink-0 text-[#E85A2A]" />
          <div>
            <h3 className="font-bold text-[#E85A2A]">Forecasted CPA Spike</h3>
            <p className="text-sm text-gray-300">
              Ensemble detects 22% risk increase in Google Ads (Account: {orgId}) over the next 48h.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
