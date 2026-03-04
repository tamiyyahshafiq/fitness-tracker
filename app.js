// =====================
// Storage
// =====================
const STORAGE_KEY = "fitnessTracker_v2";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { sessions: [], goals: defaultGoals() };
  } catch {
    return { sessions: [], goals: defaultGoals() };
  }
}
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function defaultGoals() {
  return {
    pushups: 10,
    pullups: 1,
    mile: "8:00",
    goalDate: ""
  };
}

// =====================
// Templates (Home/Gym)
// =====================
const templates = {
  gym: {
    lower: [
      row("Leg Press", "8", "8", "8", "", "", "", "7", "Feet shoulder width"),
      row("Hamstring Curl Machine", "10", "10", "10", "", "", "", "7", ""),
      row("Step-Ups", "10e", "10e", "10e", "", "", "", "7", "e = each leg"),
      row("Hip Thrust / Glute Bridge", "10", "10", "10", "", "", "", "7", "Pause 1s at top"),
      row("Calf Raises", "12", "12", "12", "", "", "", "6", ""),
      row("Side Plank", "20–30s", "20–30s", "20–30s", "", "", "", "6", "each side")
    ],
    upper: [
      row("Assisted Pull-Up Machine", "5", "5", "5", "5", "Assist: 60", "", "8", "Lower slowly 2–3s"),
      row("Lat Pulldown", "8", "8", "8", "", "", "", "7", "Elbows to ribs"),
      row("Seated Row", "10", "10", "10", "", "", "", "7", ""),
      row("Chest Press Machine", "8", "8", "8", "", "", "", "7", ""),
      row("Incline Pushups", "AMRAP", "AMRAP", "AMRAP", "", "", "", "8", "AMRAP = as many reps as possible"),
      row("Dead Hang", "20s", "20s", "20s", "", "", "", "6", "")
    ],
    full: [
      row("Squat (light, form)", "8", "8", "8", "", "", "", "6", "Slow + brace"),
      row("Romanian Deadlift", "8", "8", "8", "", "", "", "7", "Hips back"),
      row("Lat Pulldown", "8", "8", "8", "", "", "", "7", ""),
      row("Incline Pushups", "AMRAP", "AMRAP", "AMRAP", "", "", "", "8", ""),
      row("Glute Bridge", "12", "12", "12", "", "", "", "6", ""),
      row("Dead Bug", "6e", "6e", "6e", "", "", "", "6", "e = each side")
    ],
    run_easy: [
      row("Easy Run", "", "", "", "", "6.0–6.5 mph", "20–30 min", "5", "Talk pace")
    ],
    run_intervals: [
      row("Warm-up jog", "", "", "", "", "6.0 mph", "5–10 min", "4", ""),
      row("Intervals (1 min fast / 2 min easy) ×5", "", "", "", "", "Fast 7.8–8.2 / Easy 6.0", "~20 min", "8", "Stop before form breaks"),
      row("Cool-down", "", "", "", "", "6.0 mph", "5 min", "4", "")
    ],
    swim: [
      row("Swim Warm-up", "", "", "", "", "easy", "4 laps", "4", ""),
      row("Main Set: 4×4 laps", "", "", "", "", "steady", "16 laps", "6", "Rest ~30s"),
      row("Cool-down", "", "", "", "", "easy", "2–4 laps", "4", "")
    ],
    core: [
      row("Dead Bug", "6e", "6e", "6e", "", "", "", "6", ""),
      row("Side Plank", "20–30s", "20–30s", "20–30s", "", "", "", "6", "each side"),
      row("Glute Bridge", "10", "10", "10", "", "", "", "6", ""),
      row("90/90 Breathing", "5 breaths", "5 breaths", "", "", "", "", "3", "Ribs down")
    ],
    mobility: [
      row("Walk", "", "", "", "", "easy", "10–20 min", "3", ""),
      row("Hip Flexor Stretch", "45s", "45s", "", "", "", "", "2", "each side"),
      row("Couch Stretch", "45s", "45s", "", "", "", "", "2", "each side"),
      row("Thoracic Rotation", "8", "8", "", "", "", "", "2", "each side"),
      row("Calf Stretch", "45s", "45s", "", "", "", "", "2", "each side")
    ]
  },
  home: {
    lower: [
      row("Goblet Squat", "10", "10", "10", "", "", "", "7", "Weight at chest"),
      row("DB Romanian Deadlift", "8", "8", "8", "", "", "", "7", "Hips back, flat back"),
      row("Step-Ups (bench)", "10e", "10e", "10e", "", "", "", "7", ""),
      row("Glute Bridge", "12", "12", "12", "", "", "", "6", ""),
      row("Calf Raises", "15", "15", "15", "", "", "", "6", ""),
      row("Side Plank", "20–30s", "20–30s", "20–30s", "", "", "", "6", "each side")
    ],
    upper: [
      row("Incline Pushups (bench)", "8–12", "8–12", "8–12", "", "", "", "8", "Lower slow"),
      row("One-arm DB Row", "10e", "10e", "10e", "", "", "", "7", ""),
      row("DB Shoulder Press", "8", "8", "8", "", "", "", "7", ""),
      row("Bench Dips", "8–10", "8–10", "8–10", "", "", "", "7", "Shoulders down"),
      row("Dead Bug", "6e", "6e", "6e", "", "", "", "6", "")
    ],
    full: [
      row("Goblet Squat", "8–10", "8–10", "8–10", "", "", "", "7", ""),
      row("DB Romanian Deadlift", "8", "8", "8", "", "", "", "7", ""),
      row("One-arm DB Row", "10e", "10e", "10e", "", "", "", "7", ""),
      row("Incline Pushups", "AMRAP", "AMRAP", "AMRAP", "", "", "", "8", ""),
      row("Glute Bridge", "12", "12", "12", "", "", "", "6", ""),
      row("Side Plank", "20–30s", "20–30s", "20–30s", "", "", "", "6", "")
    ],
    run_easy: [
      row("Easy Run", "", "", "", "", "easy", "20–30 min", "5", "Talk pace")
    ],
    run_intervals: [
      row("Warm-up jog", "", "", "", "", "easy", "5–10 min", "4", ""),
      row("Intervals (1 min fast / 2 min easy) ×5", "", "", "", "", "fast/moderate", "~20 min", "8", ""),
      row("Cool-down", "", "", "", "", "easy", "5 min", "4", "")
    ],
    swim: [
      row("Swim Warm-up", "", "", "", "", "easy", "4 laps", "4", ""),
      row("Main Set: 4×4 laps", "", "", "", "", "steady", "16 laps", "6", "Rest ~30s"),
      row("Cool-down", "", "", "", "", "easy", "2–4 laps", "4", "")
    ],
    core: [
      row("Dead Bug", "6e", "6e", "6e", "", "", "", "6", ""),
      row("Side Plank", "20–30s", "20–30s", "20–30s", "", "", "", "6", ""),
      row("Glute Bridge", "10", "10", "10", "", "", "", "6", ""),
      row("90/90 Breathing", "5 breaths", "5 breaths", "", "", "", "", "3", "")
    ],
    mobility: [
      row("Walk", "", "", "", "", "easy", "10–20 min", "3", ""),
      row("Hip Flexor Stretch", "45s", "45s", "", "", "", "", "2", "each side"),
      row("Couch Stretch", "45s", "45s", "", "", "", "", "2", "each side"),
      row("Thoracic Rotation", "8", "8", "", "", "", "", "2", "each side"),
      row("Calf Stretch", "45s", "45s", "", "", "", "", "2", "each side")
    ]
  }
};

function row(name, s1="", s2="", s3="", s4="", wp="", td="", effort="", notes="") {
  return { name, s1, s2, s3, s4, wp, td, effort, notes };
}

// =====================
// DOM
// =====================
const dateEl = document.getElementById("date");
const locationEl = document.getElementById("location");
const workoutTypeEl = document.getElementById("workoutType");
const populateBtn = document.getElementById("populate");
const addRowBtn = document.getElementById("addRow");
const clearRowsBtn = document.getElementById("clearRows");
const saveSessionBtn = document.getElementById("saveSession");
const resetFormBtn = document.getElementById("resetForm");
const tbody = document.getElementById("tbody");
const sessionNotesEl = document.getElementById("sessionNotes");

const sessionsList = document.getElementById("sessionsList");
const exportBtn = document.getElementById("exportData");
const importInput = document.getElementById("importData");
const wipeAllBtn = document.getElementById("wipeAll");

// Tabs
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tabPanel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    if (btn.dataset.tab === "dashboard") renderDashboard();
  });
});

// Goals UI
const goalPushupsEl = document.getElementById("goalPushups");
const goalPullupsEl = document.getElementById("goalPullups");
const goalMileEl = document.getElementById("goalMile");
const goalDateEl = document.getElementById("goalDate");
const saveGoalsBtn = document.getElementById("saveGoals");
const resetGoalsBtn = document.getElementById("resetGoals");
const kpiPushups = document.getElementById("kpiPushups");
const kpiPullAssist = document.getElementById("kpiPullAssist");
const kpiMile = document.getElementById("kpiMile");

const guidesContent = document.getElementById("guidesContent");
const weeklyContent = document.getElementById("weeklyContent");

// Date default
dateEl.valueAsDate = new Date();

// =====================
// Table helpers
// =====================
function addRowToTable(r) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input value="${escapeHtml(r.name)}" data-k="name" /></td>
    <td><input value="${escapeHtml(r.s1)}" data-k="s1" /></td>
    <td><input value="${escapeHtml(r.s2)}" data-k="s2" /></td>
    <td><input value="${escapeHtml(r.s3)}" data-k="s3" /></td>
    <td><input value="${escapeHtml(r.s4)}" data-k="s4" /></td>
    <td><input value="${escapeHtml(r.wp)}" data-k="wp" /></td>
    <td><input value="${escapeHtml(r.td)}" data-k="td" /></td>
    <td><input value="${escapeHtml(r.effort)}" data-k="effort" /></td>
    <td><input value="${escapeHtml(r.notes)}" data-k="notes" /></td>
    <td><button class="remove" title="Remove row">×</button></td>
  `;
  tr.querySelector(".remove").addEventListener("click", () => tr.remove());
  tbody.appendChild(tr);
}
function clearTable(){ tbody.innerHTML = ""; }
function getRowsFromTable() {
  const rows = [];
  tbody.querySelectorAll("tr").forEach(tr => {
    const obj = {};
    tr.querySelectorAll("input").forEach(inp => obj[inp.dataset.k] = inp.value.trim());
    rows.push(obj);
  });
  return rows;
}
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// =====================
// Logging actions
// =====================
populateBtn.addEventListener("click", () => {
  const loc = locationEl.value;
  const type = workoutTypeEl.value;
  clearTable();
  (templates?.[loc]?.[type] ?? []).forEach(r => addRowToTable(r));
});

addRowBtn.addEventListener("click", () => addRowToTable(row("")));
clearRowsBtn.addEventListener("click", () => { if (confirm("Clear all rows?")) clearTable(); });

resetFormBtn.addEventListener("click", () => {
  if (!confirm("Reset the form (does not delete saved sessions)?")) return;
  dateEl.valueAsDate = new Date();
  sessionNotesEl.value = "";
  clearTable();
});

saveSessionBtn.addEventListener("click", () => {
  const data = loadData();
  const session = {
    id: crypto.randomUUID(),
    date: dateEl.value,
    location: locationEl.value,
    workoutType: workoutTypeEl.value,
    sessionNotes: sessionNotesEl.value.trim(),
    rows: getRowsFromTable(),
    createdAt: new Date().toISOString()
  };
  data.sessions.unshift(session);
  saveData(data);
  renderSessions();
  alert("Saved!");
});

// Export / Import / Wipe
exportBtn.addEventListener("click", () => {
  const data = loadData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fitness-tracker-backup.json";
  a.click();
  URL.revokeObjectURL(url);
});

importInput.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const text = await file.text();
  try {
    const incoming = JSON.parse(text);
    if (!incoming.sessions || !Array.isArray(incoming.sessions)) throw new Error("Invalid");
    if (!incoming.goals) incoming.goals = defaultGoals();
    saveData(incoming);
    renderSessions();
    alert("Imported!");
  } catch {
    alert("Import failed: invalid JSON file.");
  } finally {
    importInput.value = "";
  }
});

wipeAllBtn.addEventListener("click", () => {
  if (!confirm("Wipe ALL saved sessions? This cannot be undone unless you exported.")) return;
  const data = loadData();
  data.sessions = [];
  saveData(data);
  renderSessions();
});

// =====================
// Sessions list
// =====================
function summarizeSession(s) {
  const lines = (s.rows || []).map(r => {
    const sets = [r.s1, r.s2, r.s3, r.s4].filter(Boolean).join(" | ");
    const wp = r.wp ? ` • ${r.wp}` : "";
    const td = r.td ? ` • ${r.td}` : "";
    const ef = r.effort ? ` • RPE ${r.effort}` : "";
    const note = r.notes ? ` • ${r.notes}` : "";
    return `- ${r.name}${sets ? `: ${sets}` : ""}${wp}${td}${ef}${note}`;
  });
  return lines.join("\n");
}
function labelWorkoutType(key) {
  const map = {
    lower: "Lower Body + Core",
    upper: "Upper Body (Pull-up focus)",
    full: "Full Body Strength",
    run_easy: "Run — Easy",
    run_intervals: "Run — Intervals",
    swim: "Swim",
    core: "Core Only",
    mobility: "Mobility / Recovery"
  };
  return map[key] || key;
}
function renderSessions() {
  const data = loadData();
  sessionsList.innerHTML = "";

  if (data.sessions.length === 0) {
    sessionsList.innerHTML = `<p class="sub">No sessions saved yet.</p>`;
    return;
  }

  data.sessions.forEach(s => {
    const div = document.createElement("div");
    div.className = "session";
    const pretty = summarizeSession(s);

    div.innerHTML = `
      <h3>${escapeHtml(s.date)} — ${escapeHtml(s.location.toUpperCase())} — ${escapeHtml(labelWorkoutType(s.workoutType))}</h3>
      <div class="meta">${escapeHtml(s.sessionNotes || "")}</div>
      <pre>${escapeHtml(pretty)}</pre>
      <div class="actions">
        <button class="btn secondary" data-act="load">Load into editor</button>
        <button class="btn danger" data-act="delete">Delete</button>
      </div>
    `;

    div.querySelector('[data-act="delete"]').addEventListener("click", () => {
      if (!confirm("Delete this session?")) return;
      const updated = loadData();
      updated.sessions = updated.sessions.filter(x => x.id !== s.id);
      saveData(updated);
      renderSessions();
    });

    div.querySelector('[data-act="load"]').addEventListener("click", () => {
      dateEl.value = s.date;
      locationEl.value = s.location;
      workoutTypeEl.value = s.workoutType;
      sessionNotesEl.value = s.sessionNotes || "";
      clearTable();
      (s.rows || []).forEach(r => addRowToTable(row(
        r.name, r.s1, r.s2, r.s3, r.s4, r.wp, r.td, r.effort, r.notes
      )));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    sessionsList.appendChild(div);
  });
}

// =====================
// Dashboard: parsing metrics
// =====================
function normalizeName(s){ return (s || "").trim().toLowerCase(); }

function parseNumberLoose(v) {
  // pulls the first number out of a string like "Assist: 60" or "60 lb"
  const m = String(v ?? "").match(/(\d+(\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

function parseTimeToSeconds(mmss) {
  const s = String(mmss ?? "").trim();
  const m = s.match(/^(\d+):(\d{1,2})$/);
  if (!m) return null;
  const min = Number(m[1]);
  const sec = Number(m[2]);
  if (sec >= 60) return null;
  return min * 60 + sec;
}

function secondsToTime(sec) {
  if (sec == null) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function computeSeries() {
  const data = loadData();
  const sessions = [...data.sessions].sort((a,b) => (a.date || "").localeCompare(b.date || ""));

  const pushupsByDate = new Map();  // best reps
  const pullAssistByDate = new Map(); // best (lowest)
  const mileByDate = new Map(); // best (lowest seconds)

  sessions.forEach(sess => {
    const d = sess.date || "";
    (sess.rows || []).forEach(r => {
      const name = normalizeName(r.name);

      // Pushups: row called "pushups" OR "incline pushups" counts.
      if (name === "pushups" || name.includes("pushup")) {
        const reps = [r.s1, r.s2, r.s3, r.s4].map(parseNumberLoose).filter(x => x != null);
        const best = reps.length ? Math.max(...reps) : null;
        if (best != null) {
          const prev = pushupsByDate.get(d);
          if (prev == null || best > prev) pushupsByDate.set(d, best);
        }
      }

      // Assisted Pull-ups: expects assistance number in weight/pace (lower is better)
      if (name.includes("assisted pull-up")) {
        const assist = parseNumberLoose(r.wp);
        if (assist != null) {
          const prev = pullAssistByDate.get(d);
          if (prev == null || assist < prev) pullAssistByDate.set(d, assist);
        }
      }

      // Mile: row named "mile" with time in Time/Distance
      if (name === "mile") {
        const secs = parseTimeToSeconds(r.td);
        if (secs != null) {
          const prev = mileByDate.get(d);
          if (prev == null || secs < prev) mileByDate.set(d, secs);
        }
      }
    });
  });

  const pushDates = [...pushupsByDate.keys()].sort();
  const pullDates = [...pullAssistByDate.keys()].sort();
  const mileDates = [...mileByDate.keys()].sort();

  return {
    push: { labels: pushDates, values: pushDates.map(d => pushupsByDate.get(d)) },
    pull: { labels: pullDates, values: pullDates.map(d => pullAssistByDate.get(d)) },
    mile: { labels: mileDates, values: mileDates.map(d => mileByDate.get(d)) }
  };
}

function bestOf(values, mode) {
  const clean = values.filter(v => v != null);
  if (!clean.length) return null;
  return mode === "min" ? Math.min(...clean) : Math.max(...clean);
}

// =====================
// Charts
// =====================
let chartPush = null;
let chartPull = null;
let chartMile = null;

function buildChart(canvasId, labels, values, label) {
  const ctx = document.getElementById(canvasId);
  return new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{ label, data: values, tension: 0.25 }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { maxRotation: 0 } }
      }
    }
  });
}

function renderDashboard() {
  const data = loadData();

  // Fill goals inputs
  goalPushupsEl.value = data.goals?.pushups ?? 10;
  goalPullupsEl.value = data.goals?.pullups ?? 1;
  goalMileEl.value = data.goals?.mile ?? "8:00";
  goalDateEl.value = data.goals?.goalDate ?? "";

  // Compute series
  const series = computeSeries();

  // KPIs
  const bestPush = bestOf(series.push.values, "max");
  const bestAssist = bestOf(series.pull.values, "min");
  const bestMile = bestOf(series.mile.values, "min");

  kpiPushups.textContent = bestPush != null ? `${bestPush}` : "—";
  kpiPullAssist.textContent = bestAssist != null ? `${bestAssist} assist` : "—";
  kpiMile.textContent = bestMile != null ? secondsToTime(bestMile) : "—";

  // Destroy old charts before re-render
  if (chartPush) chartPush.destroy();
  if (chartPull) chartPull.destroy();
  if (chartMile) chartMile.destroy();

  chartPush = buildChart("chartPushups", series.push.labels, series.push.values, "Pushups");
  chartPull = buildChart("chartPullAssist", series.pull.labels, series.pull.values, "Assist (lower is better)");
  chartMile = buildChart("chartMile", series.mile.labels, series.mile.values.map(secondsToTime), "Mile time");

  // Note: the mile chart is showing formatted strings; for a numeric axis, keep seconds.
  // If you want a numeric axis, replace map(secondsToTime) with raw seconds and add a tick callback.
}

// Goals actions
saveGoalsBtn.addEventListener("click", () => {
  const data = loadData();
  data.goals = {
    pushups: Number(goalPushupsEl.value || 0),
    pullups: Number(goalPullupsEl.value || 0),
    mile: (goalMileEl.value || "8:00").trim(),
    goalDate: goalDateEl.value || ""
  };
  saveData(data);
  alert("Goals saved!");
  renderDashboard();
});

resetGoalsBtn.addEventListener("click", () => {
  const data = loadData();
  data.goals = defaultGoals();
  saveData(data);
  renderDashboard();
});

// =====================
// Guides + Weekly Plan content
// =====================
function renderGuides() {
  guidesContent.innerHTML = `
    <h3>Squat (goblet or bodyweight)</h3>
    <ul>
      <li><b>Cues:</b> “Hips back, chest tall, weight mid-foot.”</li>
      <li><b>Brace:</b> small exhale → tighten abs 20–30% like someone might poke you.</li>
      <li><b>Tempo:</b> go down 2–3 seconds; stand up normally.</li>
      <li><b>Depth:</b> only as low as you can keep ribs down and back neutral.</li>
      <li><b>Common mistakes:</b> heels lifting, knees caving in, chest collapsing, rounding lower back, moving too fast.</li>
    </ul>
    <p class="hint">Fix for leaning forward: squat to a bench/chair and pause lightly, then stand.</p>

    <h3>Romanian Deadlift (RDL)</h3>
    <ul>
      <li><b>What it is:</b> a hip hinge (not a squat).</li>
      <li><b>Cues:</b> “Soft knees, hips back, long spine.”</li>
      <li><b>Feel:</b> stretch in hamstrings; glutes do the work to stand up.</li>
      <li><b>Common mistakes:</b> rounding back, bending knees too much (turning it into a squat), letting weights drift away from legs.</li>
    </ul>

    <h3>Step-ups</h3>
    <ul>
      <li><b>Cues:</b> “Whole foot on bench, drive through heel, stand tall.”</li>
      <li><b>Common mistakes:</b> pushing off the back leg too much, knee collapsing inward, rushing the step down.</li>
    </ul>

    <h3>Pushups (progression)</h3>
    <ul>
      <li><b>Start:</b> incline pushups on a bench/bar. When 3×12 is easy → lower the incline.</li>
      <li><b>Cues:</b> “Ribs down, glutes tight, body like a plank.”</li>
      <li><b>Common mistakes:</b> hips sagging, elbows flaring straight out, head reaching forward, half reps.</li>
    </ul>

    <h3>Assisted Pull-ups / Lat Pulldown</h3>
    <ul>
      <li><b>Sequence:</b> dead hang → shoulders down (“back pockets”) → pull elbows to ribs.</li>
      <li><b>Lower:</b> 2–3 seconds down. That’s where strength builds.</li>
      <li><b>Common mistakes:</b> shrugging, swinging, neck craning, using momentum.</li>
    </ul>

    <h3>Core (for a flatter, more stable midsection)</h3>
    <ul>
      <li><b>Dead bug:</b> lower back stays pressed into the floor. Slow reps.</li>
      <li><b>Side plank:</b> straight line head-to-heel; don’t rotate forward.</li>
      <li><b>Glute bridge:</b> squeeze glutes; don’t over-arch the back.</li>
      <li><b>Why:</b> improves posture, protects back, helps running + swimming.</li>
    </ul>

    <h3>Running (shin protection + better endurance)</h3>
    <ul>
      <li><b>Most runs easy:</b> conversational pace (for you: often ~6.0–6.5 mph on treadmill).</li>
      <li><b>Intervals 1×/week:</b> 1 min fast / 2 min easy ×5.</li>
      <li><b>Pre-run 2-min warmup:</b> 15 glute bridges + 15 calf raises + 15 toe raises.</li>
      <li><b>Common mistakes:</b> running hard every day, big mileage jumps, skipping strength work.</li>
    </ul>
  `;
}

function renderWeeklyPlan() {
  weeklyContent.innerHTML = `
    <h3>Weekly Structure (Default)</h3>
    <ul>
      <li><b>Day 1:</b> Lower Body + Core</li>
      <li><b>Day 2:</b> Upper Body (Pull-up focus)</li>
      <li><b>Day 3:</b> Cardio (Easy Run or Swim)</li>
      <li><b>Day 4:</b> Full Body Strength</li>
      <li><b>Optional Day 5:</b> Intervals OR Swim (if you feel good)</li>
      <li><b>Optional Day 6:</b> Mobility / Recovery</li>
      <li><b>Day 7:</b> Rest</li>
    </ul>

    <h3>How hard should workouts feel?</h3>
    <ul>
      <li>Strength sets should end with <b>~1–2 reps left</b> (not 5+).</li>
      <li>Easy run should feel like <b>you can talk</b>.</li>
      <li>Intervals should feel hard but controlled; finish like you could do <b>one more round</b>.</li>
    </ul>

    <h3>Progress rules (simple)</h3>
    <ul>
      <li>Every week, improve <b>one thing</b>: +1 rep, +2.5–5 lb, or slightly less pull-up assistance.</li>
      <li>If form breaks, keep the weight and clean it up first.</li>
      <li>If you feel sharp joint pain, stop and swap the move.</li>
    </ul>

    <h3>Your May targets (what this plan builds toward)</h3>
    <ul>
      <li><b>Pushups:</b> 0 → 10 clean reps (use incline progression)</li>
      <li><b>Pull-ups:</b> assistance 60 → 40 → 20 → first strict pull-up</li>
      <li><b>Mile:</b> 8:00 comfortable and pain-free</li>
    </ul>

    <p class="hint">Use the Log tab to auto-populate workouts based on Home vs Gym. You can always edit or add exercises.</p>
  `;
}

// =====================
// Initial render
// =====================
renderSessions();
renderGuides();
renderWeeklyPlan();
