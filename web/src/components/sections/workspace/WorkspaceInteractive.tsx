"use client";

import { useState, type CSSProperties } from "react";
import { Icon, Logo } from "./parts";

const da = (n: number) => n.toLocaleString("da-DK");

// ── Integrationer · MCP-forbindelser ──
const DATA_SOURCES: [string, string, string][] = [
  ["sharepoint", "SharePoint", "Dokumenter & sites"],
  ["m365", "Microsoft 365", "Mail, Teams & filer"],
  ["slack", "Slack", "Beskeder & kanaler"],
  ["salesforce", "Salesforce", "CRM & kundedata"],
  ["visma", "Visma", "Økonomi & løn"],
  ["deepl", "DeepL", "Oversættelse"],
];
const AI_MODELS: [string, string, string][] = [
  ["chatgpt", "ChatGPT", "OpenAI"],
  ["claude", "Claude", "Anthropic"],
  ["gemini", "Gemini", "Google"],
  ["azure", "Azure OpenAI", "Microsoft Azure"],
];
const DATA_TOOLS = ["Søg i dokumenter", "Hent fil", "List biblioteker", "Søg i sites"];
const MODEL_TOOLS = ["Generér svar", "Opsummér tekst", "Oversæt indhold", "Analysér data"];

function McpRow({
  logo,
  name,
  sub,
  active,
  onSelect,
}: {
  logo: string;
  name: string;
  sub: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button className={"mcp-row" + (active ? " active" : "")} onClick={onSelect}>
      <span className="mcp-logo">
        <Logo name={logo} size={22} />
      </span>
      <span className="mcp-row-text">
        <span className="mcp-row-name">{name}</span>
        <span className="mcp-row-sub">{sub}</span>
      </span>
      <span className="mcp-row-status">
        <span className="dot-live" /> Forbundet
      </span>
    </button>
  );
}

export function McpView() {
  const all = [...DATA_SOURCES, ...AI_MODELS];
  const [sel, setSel] = useState(0);
  const cur = all[sel];
  const isModel = sel >= DATA_SOURCES.length;
  const tools = isModel ? MODEL_TOOLS : DATA_TOOLS;
  return (
    <div className="mcp-frame">
      <div className="appwin">
        <div className="appwin-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <div className="appwin-url">workspace.ai-konsulenterne.dk/mcp</div>
        </div>
        <div className="mcp">
          <div className="mcp-head">
            <div className="mcp-title">
              MCP-forbindelser
              <span className="mcp-sub"> · Eksterne værktøjsservere</span>
            </div>
            <button className="mcp-new">
              <Icon name="plus" size={16} /> Ny forbindelse
            </button>
          </div>
          <div className="mcp-body">
            <div className="mcp-list">
              <div className="mcp-group-label">Datakilder</div>
              {DATA_SOURCES.map((d, i) => (
                <McpRow
                  key={d[0]}
                  logo={d[0]}
                  name={d[1]}
                  sub={d[2]}
                  active={sel === i}
                  onSelect={() => setSel(i)}
                />
              ))}
              <div className="mcp-group-label">AI-modeller</div>
              {AI_MODELS.map((d, i) => (
                <McpRow
                  key={d[0]}
                  logo={d[0]}
                  name={d[1]}
                  sub={d[2]}
                  active={sel === i + DATA_SOURCES.length}
                  onSelect={() => setSel(i + DATA_SOURCES.length)}
                />
              ))}
            </div>
            <div className="mcp-detail">
              <div className="mcp-detail-head">
                <span className="mcp-logo lg">
                  <Logo name={cur[0]} size={30} />
                </span>
                <div>
                  <div className="mcp-detail-name">{cur[1]}</div>
                  <div className="mcp-detail-status">
                    <span className="dot-live" /> Forbundet · {cur[2]}
                  </div>
                </div>
              </div>
              <div className="mcp-tools-label">Tilladte værktøjer</div>
              <div className="mcp-tools">
                {tools.map((t) => (
                  <div className="mcp-tool" key={t}>
                    <span>{t}</span>
                    <span className="mcp-toggle on">
                      <span className="knob" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Pris-beregner ──
export function PricingCalc() {
  const [n, setN] = useState(25);
  const min = 10,
    max = 150;
  const pct = ((n - min) / (max - min)) * 100;
  const tokens = n * 3;
  const searches = n * 200;
  const memory = (n * 1.2).toFixed(1).replace(".0", "");
  const total = n * 150;
  return (
    <div className="price-card">
      <div className="price-slider-head">
        <span className="price-slider-label">Antal medarbejdere</span>
        <span className="price-count">{n}</span>
      </div>
      <div
        className="slider-wrap"
        style={{ "--pct": pct + "%" } as CSSProperties}
      >
        <input
          type="range"
          min={min}
          max={max}
          value={n}
          onChange={(e) => setN(+e.target.value)}
          aria-label="Antal medarbejdere"
        />
      </div>
      <div className="slider-ends">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <div className="price-stats">
        {[
          ["Tokens inkl.", da(tokens) + " mio."],
          ["Søgninger inkl.", da(searches)],
          ["Hukommelse inkl.", memory + " GB"],
        ].map(([l, v]) => (
          <div className="price-stat" key={l}>
            <span className="tag">{l}</span>
            <span className="price-stat-val">{v}</span>
          </div>
        ))}
      </div>

      <div className="price-foot">
        <div>
          <span className="price-total-label">Total pris pr. måned</span>
          <div className="price-total">
            <span className="accent">{da(total)} kr</span>
          </div>
          <span className="price-per">150 kr pr. bruger</span>
        </div>
        <a href="#demo" className="btn btn-primary btn-lg">
          Kom i gang
        </a>
      </div>
    </div>
  );
}

// ── FAQ ──
const FAQS: [string, string][] = [
  [
    "Hvordan adskiller AIK Workspace sig fra ChatGPT?",
    "AIK Workspace føles som ChatGPT, men er forankret i jeres egen forretningsdata og integrerer med jeres systemer. Det betyder præcise, relevante svar baseret på jeres dokumenter, processer og viden.",
  ],
  [
    "Er vores data sikker?",
    "Ja. Jeres data bliver i Microsoft Azure (EU) under fuld GDPR-compliance og deles aldrig med tredjeparter som OpenAI eller Anthropic. I vælger selv præcist hvilke kilder der indekseres.",
  ],
  [
    "Hvor lang tid tager implementeringen?",
    "De fleste virksomheder er i gang inden for få uger. Vi står for opsætning, integration og oplæring - I skal ikke forberede noget.",
  ],
  [
    "Hvilke systemer kan AIK Workspace integrere med?",
    "SharePoint, Microsoft 365, Slack, Salesforce, Visma, DeepL og mange flere via API. Kan I tilgå det med en API, kan vi som regel forbinde det.",
  ],
  [
    "Kan vi vælge forskellige AI-modeller?",
    "Ja. I kan frit vælge mellem ChatGPT, Claude, Gemini og Azure OpenAI - og skifte model alt efter opgaven.",
  ],
];

export function FaqList() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {FAQS.map(([q, a], i) => {
        const on = open === i;
        return (
          <div className={"faq-item" + (on ? " on" : "")} key={q}>
            <button
              className="faq-q"
              onClick={() => setOpen(on ? -1 : i)}
              aria-expanded={on}
            >
              <span>{q}</span>
              <span className="faq-icon">
                <Icon name={on ? "minus" : "plus"} size={18} />
              </span>
            </button>
            <div
              className="faq-a-wrap"
              style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
            >
              <div className="faq-a-inner">
                <p className="faq-a">{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
