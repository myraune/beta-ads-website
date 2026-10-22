import React from "react";
import {
  Megaphone, SquarePlay, PanelLeft, Target, Images, ChartColumn, MessagesSquare, Rocket, Upload, Check,
  ArrowRight, ArrowLeft, Info, LayoutDashboard, Users, ListChecks, CreditCard, Moon, Gamepad2, ChevronDown, Calendar,
} from "lucide-react";
import "./builder-panels.css";
import { FlagNO, TwitchMark } from "./marks";

/* The campaign builder as it is in the business portal (beta.business.livad.stream,
   walked through on 22 Oct 2026, see memory reference_beta_business_portal): same
   step names, headings, fields, toggles and six formats. One markup, two themes:
   "portal" is a faithful light copy with the app shell, "site" is the dark product
   surface used elsewhere on beta-ads.no. Prices, CPMs and minimum budgets are left
   out on purpose (internal). The forecast is the portal's own figure for English +
   Norway + Twitch. The preview uses our Glorious creative instead of the portal sample. */

export type BuilderTheme = "portal" | "site";

const STEPS = ["Campaign objective", "Target audience", "Campaign format", "Campaign asset", "Campaign review"];
const FORMATS: [string, React.ElementType][] = [
  ["Video", SquarePlay], ["Side Bar", PanelLeft], ["Snipe", Target], ["Rich Media", Images], ["Poll", ChartColumn], ["Interactive", MessagesSquare],
];
const NAV: [string, React.ElementType][] = [
  ["Dashboard", LayoutDashboard], ["Streamer Explorer", Users], ["Category Explorer", Gamepad2], ["My Streamer Lists", ListChecks], ["Plan & Usage", CreditCard],
];

/** Diamond with a right-turn arrow, the portal's Traffic icon. */
const TrafficIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.5 21.5 12 12 21.5 2.5 12z" /><path d="M9 14v-2.5a1.5 1.5 0 0 1 1.5-1.5H15" /><path d="m13 8 2 2-2 2" />
  </svg>
);

const Toggle: React.FC<{ on?: boolean }> = ({ on }) => <span className={`pb-tog${on ? " on" : ""}`} aria-hidden="true"><i /></span>;
const Field: React.FC<{ children?: React.ReactNode; ph?: string; icon?: React.ReactNode }> = ({ children, ph, icon }) => (
  <div className={`pb-field${children ? "" : " ph"}`}>{icon}{children ?? ph}</div>
);

const Preview: React.FC<{ chat?: boolean }> = ({ chat }) => (
  <div className={`pb-prev${chat ? " pb-prev--chat" : ""}`}>
    <div className="pb-prev-stage">
      <img className="pb-prev-bg" src="/home/build-stream-bg.webp" alt="" />
      <img className="pb-prev-ov" src="/home/glorious-poster.webp" alt="" />
    </div>
    {chat && (
      <div className="pb-chat">
        <p><b>livadbot</b>: Meet the new Glorious V3. Wireless, finally. <u>livad.gg/r/glorious</u></p>
        <i /><i /><i />
      </div>
    )}
  </div>
);

export const PortalBuilder: React.FC<{ step: number; theme: BuilderTheme }> = ({ step, theme }) => (
  <div className="pb-wrap">
  <div className={`pb pb--${theme}`} role="img" aria-label={`Campaign builder, step ${step}: ${STEPS[step - 1]}`}>
    {theme === "portal" && (
      <div className="pb-top">
        <img className="pb-logo" src="/lovable-uploads/logo-color.png" alt="" />
        <span className="pb-pill"><img src="/brand/beta-ads-icon-512.png" alt="" />Beta ads</span>
        <span className="pb-pill pb-pill--credit"><i />400</span>
        <Moon className="pb-moon" />
        <span className="pb-user"><b>Your team</b><ChevronDown /></span>
      </div>
    )}
    <div className="pb-body">
      {theme === "portal" && (
        <nav className="pb-nav">
          {NAV.map(([t, I]) => <span key={t}><I />{t}{t === "Category Explorer" && <em>NEW</em>}</span>)}
        </nav>
      )}
      <div className="pb-card">
        <ol className="pb-rail">
          {STEPS.map((s, i) => (
            <li key={s} className={i + 1 < step ? "done" : i + 1 === step ? "on" : ""}>
              <span>{i + 1 < step ? <Check /> : i + 1}</span>{s}
            </li>
          ))}
        </ol>

        <div className="pb-main">
          {step === 1 && (
            <>
              <h4>Create your campaign</h4><p className="pb-sub">Set your campaign name, objective and dates.</p>
              <label>Campaign Name</label><Field>Glorious V3 launch</Field>
              <label>Objective</label>
              <div className="pb-objs">
                <div className="pb-obj on"><span className="pb-ico"><Megaphone /></span><div><b>Awareness</b><small>Increase the awareness of your brand or product</small></div></div>
                <div className="pb-obj"><span className="pb-ico"><TrafficIcon /></span><div><b>Traffic</b><small>Drive traffic to your website or app</small></div></div>
              </div>
              <label>Start Date</label><Field icon={<Calendar />}>11/03/2026</Field>
              <label>End Date</label><Field icon={<Calendar />}>11/30/2026</Field>
              <div className="pb-actions"><span /><span className="pb-btn">Next <ArrowRight /></span></div>
            </>
          )}

          {step === 2 && (
            <div className="pb-split">
              <div>
                <h4>Set target audience</h4><p className="pb-sub">Set your targeting and campaign budget.</p>
                <div className="pb-tgt"><div className="pb-tgt-h">Language Targeting <Toggle on /></div><Field ph="Select..." /><div className="pb-chips"><span>🇬🇧 English</span></div></div>
                <div className="pb-tgt"><div className="pb-tgt-h">Country Targeting <Toggle on /></div><Field ph="Select..." /><div className="pb-chips"><span><FlagNO />Norway</span></div></div>
                <div className="pb-tgt"><div className="pb-tgt-h">Platform Targeting <Toggle on /></div><Field ph="Select..." /><div className="pb-chips"><span><TwitchMark />Twitch</span></div></div>
                <div className="pb-tgt"><div className="pb-tgt-h">Category Targeting <Toggle /></div></div>
                <div className="pb-tgt"><div className="pb-tgt-h">Streamer Targeting <Toggle on /></div><Field>Include</Field>
                  <div className="pb-chips">{[["mrsavage", "MrSavage"], ["knut", "Knut"], ["detoo", "detoo"]].map(([h, n]) => <span key={h}><img src={`/home/builder/av-${h}.webp`} alt="" />{n}</span>)}</div>
                </div>
                <div className="pb-actions"><span className="pb-btn pb-btn--back"><ArrowLeft /> Back</span><span className="pb-btn">Next <ArrowRight /></span></div>
              </div>
              <aside className="pb-side">
                <div className="pb-box"><b>Total views</b><small>Potential monthly display views</small><div className="pb-num">7,117,092 - 21,351,275</div>
                  <div className="pb-warn"><Info />Forecasted results are directional estimates and do not guarantee performance</div></div>
              </aside>
            </div>
          )}

          {step === 3 && (
            <>
              <h4>Set your campaign format</h4><p className="pb-sub">Select one of the campaign formats below and set your budget.</p>
              <label>Campaign Format</label>
              <div className="pb-fmts">
                {FORMATS.map(([n, I]) => <div key={n} className={`pb-fmt${n === "Rich Media" ? " on" : ""}`}><span className="pb-ico"><I /></span>{n}</div>)}
              </div>
              <div className="pb-fmtrow">
                <Preview />
                <div className="pb-fmtinfo">
                  <label>Format Dimension</label>
                  <div className="pb-note"><em>Rich Media</em> format's dimension is <em>1920×1080 pixels</em></div>
                  <label>Budget</label><Field ph="Enter your budget" icon={<span className="pb-cur">$</span>} />
                </div>
              </div>
              <div className="pb-actions"><span className="pb-btn pb-btn--back"><ArrowLeft /> Back</span><span className="pb-btn">Next <ArrowRight /></span></div>
            </>
          )}

          {step === 4 && (
            <>
              <h4>Set campaign asset</h4><p className="pb-sub">Select your campaign format and set your campaign assets.</p>
              <label>Creative Animation</label>
              <div className="pb-chips pb-chips--tight"><span className="pb-chip-on"><Images />Rich Media</span></div>
              <dl className="pb-specs"><div><dt>Creative dimensions:</dt><dd><em>1920×1080 pixels</em></dd></div><div><dt>Supported File Formats:</dt><dd>webm, mp4, gif, jpeg, png</dd></div><div><dt>Maximum File Size:</dt><dd>100MB</dd></div></dl>
              <span className="pb-upload"><Upload />glorious-v3.webm</span>
              <label>Sponsor Message <span className="pb-lim">(max. 150 characters)</span></label>
              <Field>Meet the new Glorious V3. Wireless, finally.</Field>
              <label>Landing Page URL</label><Field>https://gloriousgaming.com</Field>
              <label>Campaign Preview</label><small className="pb-hint">This is how your campaign will look like on the streaming platform</small>
              <div className="pb-prev-sm"><Preview chat /></div>
              <div className="pb-actions"><span className="pb-btn pb-btn--back"><ArrowLeft /> Back</span><span className="pb-btn">Next <ArrowRight /></span></div>
            </>
          )}

          {step === 5 && (
            <>
              <h4>Review your campaign details</h4><p className="pb-sub">You are in the last step to create your campaign.</p>
              <div className="pb-rev">
                {[["Campaign Name", "Glorious V3 launch"], ["Start Date", "Nov 3, 2026"], ["End Date", "Nov 30, 2026"], ["Objective", "Awareness"], ["Format", "Rich Media"], ["Asset", "glorious-v3.webm"]].map(([k, v]) => (
                  <div key={k}><label>{k}</label><Field icon={k.includes("Date") ? <Calendar /> : undefined}>{v}</Field></div>
                ))}
              </div>
              <div className="pb-revt"><label>Language Targeting</label><Field>🇬🇧 English</Field></div>
              <div className="pb-revt"><label>Country Targeting</label><Field><FlagNO />Norway</Field></div>
              <div className="pb-revt"><label>Platform Targeting</label><Field><TwitchMark />Twitch</Field></div>
              <div className="pb-actions"><span className="pb-btn pb-btn--back"><ArrowLeft /> Back</span><span className="pb-btn"><Rocket /> Create</span></div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
  </div>
);

