const STORAGE_KEY = "lordnine-boss-tracker-state";
const ADMIN_SESSION_KEY = "lordnine-boss-tracker-admin-session";
const ADMIN_PIN = "2601";
const SUPABASE_URL = "https://jlgzplkatutibmrnznwx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1Kw3Us1AP5DYnmF4zpCL4g_hSpcIi2Z";
const PRESET_STATE_VERSION = "2026-10-01-spawn-board";
const SCHEDULED_ACTIVE_WINDOW_MS = 2 * 60 * 60 * 1000;
const WARNING_WINDOW_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;
const UTC_PLUS_8_OFFSET_MS = 8 * HOUR_MS;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIMEZONE_SHORT_LABELS = {
  "Asia/Manila": "PHT",
  "Asia/Seoul": "KST",
};
const PRESET_ALIASES = {
  amentis: "amentis",
  araneo: "araneo",
  asta: "asta",
  baronbraudmore: "baron-braudmore",
  catena: "catena",
  clementis: "clemantis",
  clemantis: "clemantis",
  duplican: "duplican",
  ego: "ego",
  generalaquleus: "general-aquleus",
  gareth: "gareth",
  ladydalia: "lady-dalia",
  larba: "larba",
  libera: "livera",
  livera: "livera",
  metus: "metus",
  neutro: "neutro",
  ordo: "ordo",
  secreta: "secreta",
  shuliar: "shuliar",
  supore: "supore",
  titore: "titore",
  undomiel: "undomiel",
  undumiel: "undomiel",
  venatus: "venatus",
  viorent: "viorent",
  wanitas: "wannitas",
  wannitas: "wannitas",
};
const PRESET_INTERVAL_SPAWNS = [
  ["Libera", "13:56"],
  ["Wanitas", "14:01"],
  ["Duplican", "14:21"],
  ["Undumiel", "14:39"],
  ["Araneo", "14:57"],
  ["Amentis", "19:49"],
  ["General Aquleus", "19:57"],
  ["Venatus", "20:20"],
  ["Viorent", "20:20"],
  ["Shuliar", "01:25"],
  ["Catena", "01:44"],
  ["Larba", "01:48"],
  ["Lady Dalia", "02:47"],
  ["Baron Braudmore", "06:28"],
  ["Gareth", "06:33"],
  ["Ego", "08:23"],
  ["Metus", "14:17"],
  ["Titore", "18:25"],
  ["Supore", "04:20"],
  ["Asta", "04:24"],
  ["Ordo", "04:31"],
  ["Secreta", "04:37"],
];

const bosses = [
  intervalBoss("venatus", "Venatus", 60, 10, "Corrupted River Stream"),
  intervalBoss("viorent", "Viorent", 65, 10, "Gill Stream"),
  intervalBoss("ego", "Ego", 70, 21, "Reclaimed Gathering Point"),
  intervalBoss("livera", "Livera", 75, 24, "Black Storm Peninsula"),
  intervalBoss("araneo", "Araneo", 75, 24, "Lower Tomb of Tyriosa 1F"),
  intervalBoss("undomiel", "Undomiel", 80, 24, "Test Subject Lab"),
  intervalBoss("lady-dalia", "Lady Dalia", 85, 18, "Bloody Shadow"),
  intervalBoss("general-aquleus", "General Aquleus", 85, 29, "Lower Tomb of Tyriosa 2F"),
  intervalBoss("amentis", "Amentis", 88, 29, "Limestone Cape"),
  intervalBoss("baron-braudmore", "Baron Braudmore", 88, 32, "Rosevine Bridge"),
  intervalBoss("wannitas", "Wannitas", 93, 48, "Snare Swamp"),
  intervalBoss("metus", "Metus", 93, 48, "Follower's Field"),
  intervalBoss("duplican", "Duplican", 93, 48, "Open-Eyed Puppet's Throne"),
  intervalBoss("shuliar", "Shuliar", 95, 35, "Masquerade of Hounds"),
  intervalBoss("gareth", "Gareth", 98, 32, "Deadman's Land District 1"),
  intervalBoss("titore", "Titore", 98, 37, "Deadman's Land District 2"),
  intervalBoss("larba", "Larba", 98, 35, "Garbana Reclaimed Land"),
  intervalBoss("catena", "Catena", 100, 35, "Deadman's Land District 3"),
  intervalBoss("secreta", "Secreta", 100, 62, "Kallion's Tomb"),
  intervalBoss("ordo", "Ordo", 100, 62, "Successor's Paradise"),
  intervalBoss("asta", "Asta", 100, 62, "Goldblood Plain"),
  intervalBoss("supore", "Supore", 100, 62, "Goldblood Plain"),
  scheduledBoss("clemantis", "Clemantis", 70, "White Witch's Cradle", [
    "Mon 11:30",
    "Thu 19:00",
  ]),
  scheduledBoss("saphirus", "Saphirus", 80, "Moonlight Shackle", [
    "Sun 17:00",
    "Tue 11:30",
  ]),
  scheduledBoss("neutro", "Neutro", 80, "Battlefield of Love and Hatred", [
    "Tue 19:00",
    "Thu 11:30",
  ]),
  scheduledBoss("thymele", "Thymele", 85, "Mark of Rampage", [
    "Mon 19:00",
    "Wed 11:30",
  ]),
  scheduledBoss("milavy", "Milavy", 90, "Lower Tomb of Tyriosa 3F", [
    "Sat 15:00",
  ]),
  scheduledBoss("ringor", "Ringor", 95, "Torchlight Highway", [
    "Sat 17:00",
  ]),
  scheduledBoss("roderick", "Roderick", 95, "Garbana Underground Waterway 1F", [
    "Fri 19:00",
  ]),
  scheduledBoss("auraq", "Auraq", 100, "Garbana Underground Waterway 2F", [
    "Fri 22:00",
    "Wed 21:00",
  ]),
  scheduledBoss("kamalia", "Kamalia", 135, "Controlled Laboratory", [
    "Thu 21:00",
  ]),
  scheduledBoss("chaiflock", "Chaiflock", 120, "Kallion's Tomb", [
    "Sun 15:00",
  ]),
  scheduledBoss("benji", "Benji", 120, "Nest of Vengeance", [
    "Sun 21:00",
  ]),
  scheduledBoss("libitina", "Libitina", 130, "Chapel of Eternal Vassalage", [
    "Mon 21:00",
    "Sat 21:00",
  ]),
  scheduledBoss("rakajeth", "Rakajeth", 130, "Secreta's Punishment", [
    "Tue 22:00",
    "Sun 19:00",
  ]),
  scheduledBoss("tumier", "Tumier", 140, "Garbana Underground Waterway 3F", [
    "Sun 19:00",
  ]),
];

const elements = {
  activeCount: document.getElementById("activeCount"),
  trackedCount: document.getElementById("trackedCount"),
  scheduledCount: document.getElementById("scheduledCount"),
  currentTimeLabel: document.getElementById("currentTimeLabel"),
  currentTime: document.getElementById("currentTime"),
  currentTimeNote: document.getElementById("currentTimeNote"),
  activeBosses: document.getElementById("activeBosses"),
  upcomingBosses: document.getElementById("upcomingBosses"),
  bossTableBody: document.getElementById("bossTableBody"),
  searchInput: document.getElementById("searchInput"),
  sortSelect: document.getElementById("sortSelect"),
  filterGroup: document.getElementById("filterGroup"),
  adminStatus: document.getElementById("adminStatus"),
  syncStatus: document.getElementById("syncStatus"),
  adminToggleButton: document.getElementById("adminToggleButton"),
  adminLogoutButton: document.getElementById("adminLogoutButton"),
  storageNotice: document.getElementById("storageNotice"),
  timeModal: document.getElementById("timeModal"),
  timeForm: document.getElementById("timeForm"),
  modalBossId: document.getElementById("modalBossId"),
  modalTitle: document.getElementById("modalTitle"),
  modalHint: document.getElementById("modalHint"),
  defeatedAtInput: document.getElementById("defeatedAtInput"),
  closeModalButton: document.getElementById("closeModalButton"),
  cancelModalButton: document.getElementById("cancelModalButton"),
  adminModal: document.getElementById("adminModal"),
  adminForm: document.getElementById("adminForm"),
  adminPinInput: document.getElementById("adminPinInput"),
  adminPinError: document.getElementById("adminPinError"),
  closeAdminModalButton: document.getElementById("closeAdminModalButton"),
  cancelAdminModalButton: document.getElementById("cancelAdminModalButton"),
};

const uiState = {
  filter: "all",
  search: "",
  sort: "next-spawn",
  modalBossId: null,
  pendingAdminAction: null,
};

let appState = loadState();
let adminSession = loadAdminSession();
const displayTimeZone = createInitialDisplayTimeZone();
let isDetectingIpTimeZone = false;
let remoteSyncState = {
  enabled: false,
  writable: false,
  loading: false,
  message: "Supabase sync is unavailable.",
};
let supabaseClient = null;
persistState();

initializeSupabaseClient();
attachEvents();
render();
detectIpTimeZone();
initializeRemoteSync();
window.setInterval(render, 1000);
window.setInterval(detectIpTimeZone, 60000);

function intervalBoss(id, name, level, intervalHours, location) {
  return {
    id,
    name,
    level,
    location,
    type: "interval",
    intervalHours,
    intervalMs: intervalHours * 60 * 60 * 1000,
    schedule: [],
  };
}

function formatBossLevel(level) {
  return Number.isFinite(level) ? `Lvl ${level}` : "Level TBD";
}

function scheduledBoss(id, name, level, location, scheduleText) {
  return {
    id,
    name,
    level,
    location,
    type: "scheduled",
    intervalHours: null,
    intervalMs: null,
    schedule: scheduleText.map(parseScheduleEntry),
    scheduleText: scheduleText.join(", "),
  };
}

function parseScheduleEntry(entry) {
  const [dayLabel, timeLabel] = entry.split(" ");
  const [hours, minutes] = timeLabel.split(":").map(Number);
  return {
    day: WEEKDAYS.indexOf(dayLabel),
    dayLabel,
    hours,
    minutes,
    display: entry,
  };
}

function attachEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    uiState.search = event.target.value.trim().toLowerCase();
    render();
  });

  elements.sortSelect.addEventListener("change", (event) => {
    uiState.sort = event.target.value;
    render();
  });

  elements.filterGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) {
      return;
    }

    uiState.filter = button.dataset.filter;
    syncFilterButtons();
    render();
  });

  elements.bossTableBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) {
      return;
    }

    const bossId = button.dataset.bossId;
    const action = button.dataset.action;
    if (!ensureAdminAccess({ action, bossId })) {
      return;
    }

    runBossAction(action, bossId);
  });

  elements.timeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!adminSession.isUnlocked) {
      uiState.pendingAdminAction = {
        action: "save-time",
        bossId: elements.modalBossId.value,
        defeatedAt: elements.defeatedAtInput.value,
      };
      closeTimeModal();
      openAdminModal();
      return;
    }

    const bossId = elements.modalBossId.value;
    const defeatedAt = new Date(elements.defeatedAtInput.value);
    setDefeatTime(bossId, defeatedAt);
    closeTimeModal();
  });

  elements.adminToggleButton.addEventListener("click", () => {
    if (adminSession.isUnlocked) {
      lockAdminSession();
      return;
    }

    openAdminModal();
  });

  elements.adminLogoutButton.addEventListener("click", lockAdminSession);
  elements.adminForm.addEventListener("submit", handleAdminUnlock);
  elements.closeAdminModalButton.addEventListener("click", () => closeAdminModal());
  elements.cancelAdminModalButton.addEventListener("click", () => closeAdminModal());
  elements.adminModal.addEventListener("click", (event) => {
    if (event.target === elements.adminModal) {
      closeAdminModal();
    }
  });

  elements.closeModalButton.addEventListener("click", closeTimeModal);
  elements.cancelModalButton.addEventListener("click", closeTimeModal);
  elements.timeModal.addEventListener("click", (event) => {
    if (event.target === elements.timeModal) {
      closeTimeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.timeModal.hidden) {
      closeTimeModal();
    }

    if (event.key === "Escape" && !elements.adminModal.hidden) {
      closeAdminModal();
    }
  });
}

function render() {
  const now = new Date();
  const bossStates = bosses.map((boss) => buildBossState(boss, now));
  const visibleBosses = filterAndSortBosses(bossStates, now);

  elements.currentTimeLabel.textContent = `${displayTimeZone.shortLabel} Raid Clock`;
  elements.currentTime.textContent = formatClockTime(now);
  elements.currentTimeNote.textContent = getCurrentTimeNote();
  renderAdminAccess();
  elements.syncStatus.textContent = remoteSyncState.message;
  elements.activeCount.textContent = bossStates.filter((boss) => boss.isActive).length;
  elements.trackedCount.textContent = bosses
    .filter((boss) => boss.type === "interval")
    .filter((boss) => Boolean(appState.defeatTimes[boss.id]))
    .length;
  elements.scheduledCount.textContent = bosses.filter((boss) => boss.type === "scheduled").length;

  renderWidgetList(
    elements.activeBosses,
    bossStates
      .filter((boss) => boss.isActive)
      .sort((left, right) => left.urgencyTime - right.urgencyTime),
    "No bosses are currently marked active."
  );

  renderWidgetList(
    elements.upcomingBosses,
    bossStates
      .filter((boss) => !boss.isActive && boss.nextSpawn)
      .sort((left, right) => left.nextSpawn - right.nextSpawn)
      .slice(0, 5),
    "No tracked upcoming spawns yet. Log a defeat to start interval timers."
  );

  elements.bossTableBody.innerHTML = visibleBosses.map((boss) => bossRowMarkup(boss, now)).join("");
}

function renderWidgetList(container, items, emptyMessage) {
  if (items.length === 0) {
    container.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
    return;
  }

  container.innerHTML = items
    .map((boss) => {
      const rightText = boss.isActive ? boss.activeSummary : boss.countdownLabel;
      const spawnText = boss.isActive ? boss.nextSpawnLabel : boss.nextSpawnLabel;

      return `
        <div class="widget-item">
          <div>
            <strong class="widget-title">${boss.name}</strong>
            <div class="widget-subtitle">${formatBossLevel(boss.level)} • ${boss.location}</div>
            <div class="widget-subtitle">${spawnText}</div>
          </div>
          <div class="widget-value">${rightText}</div>
        </div>
      `;
    })
    .join("");
}

function bossRowMarkup(boss) {
  const lastDefeated = boss.lastDefeated
    ? `
      <div>${formatDateTime(boss.lastDefeated)}</div>
      ${boss.type === "scheduled" ? '<div class="subtle-text">Current cycle clear</div>' : ""}
    `
    : `<span class="subtle-text">${boss.type === "scheduled" ? "Optional note" : "Not tracked yet"}</span>`;

  return `
    <tr class="${boss.rowClass}">
      <td class="boss-name-cell">
        <strong>${boss.name}</strong>
        <div class="boss-subline">${formatBossLevel(boss.level)}</div>
        <div class="boss-subline">${boss.statusBadge}</div>
      </td>
      <td>
        <span class="type-badge ${boss.type}">${boss.type === "interval" ? "Interval" : "Scheduled"}</span>
      </td>
      <td>${boss.location}</td>
      <td>${boss.respawnLabel}</td>
      <td>${boss.nextSpawnLabel}</td>
      <td>
        <div class="countdown-value ${boss.countdownClass}">${boss.countdownLabel}</div>
        <div class="subtle-text">${boss.helperText}</div>
      </td>
      <td>${lastDefeated}</td>
      <td>
        <div class="action-stack">
          <button type="button" class="action-button emphasis ${getActionLockClass()}" data-action="defeat-now" data-boss-id="${boss.id}">
            Defeated
          </button>
          <button type="button" class="action-button ${getActionLockClass()}" data-action="open-time-modal" data-boss-id="${boss.id}">
            Set Defeated Time
          </button>
          <button type="button" class="action-button reset ${getActionLockClass()}" data-action="reset-timer" data-boss-id="${boss.id}">
            Reset Timer
          </button>
        </div>
      </td>
    </tr>
  `;
}

function buildBossState(boss, now) {
  const lastDefeated = appState.defeatTimes[boss.id] ? new Date(appState.defeatTimes[boss.id]) : null;

  if (boss.type === "interval") {
    if (!lastDefeated) {
      return {
        ...boss,
        lastDefeated: null,
        nextSpawn: null,
        isActive: false,
        urgencyTime: Number.MAX_SAFE_INTEGER,
        rowClass: "",
        respawnLabel: `${boss.intervalHours}h interval`,
        nextSpawnLabel: "Awaiting TOD",
        countdownLabel: "--:--:--",
        countdownClass: "",
        helperText: "Click Defeated or backfill a kill time to start this timer.",
        statusBadge: '<span class="status-badge idle">Untracked</span>',
        activeSummary: "Not tracked",
      };
    }

    const nextSpawn = new Date(lastDefeated.getTime() + boss.intervalMs);
    const remainingMs = nextSpawn.getTime() - now.getTime();
    const isActive = remainingMs <= 0;
    const isWarning = !isActive && remainingMs <= WARNING_WINDOW_MS;

    return {
      ...boss,
      lastDefeated,
      nextSpawn,
      isActive,
      urgencyTime: isActive ? 0 : nextSpawn.getTime(),
      rowClass: isActive ? "row-active" : isWarning ? "row-warning" : "",
      respawnLabel: `${boss.intervalHours}h interval`,
      nextSpawnLabel: isActive ? `Spawned ${formatDateTime(nextSpawn)}` : formatDateTime(nextSpawn),
      countdownLabel: isActive ? `Live • ${formatDuration(now.getTime() - nextSpawn.getTime())}` : formatCountdown(remainingMs),
      countdownClass: isActive ? "active" : isWarning ? "warning" : "",
      helperText: isActive ? "Timer elapsed — boss should be up now." : `Killed ${formatDateTime(lastDefeated)}`,
      statusBadge: isActive
        ? '<span class="status-badge active">Active</span>'
        : isWarning
          ? '<span class="status-badge warning">Soon</span>'
          : '<span class="status-badge cooldown">Cooldown</span>',
      activeSummary: isActive ? `Live for ${formatDuration(now.getTime() - nextSpawn.getTime())}` : formatCountdown(remainingMs),
    };
  }

  const nextSpawn = getNextScheduledOccurrence(boss.schedule, now);
  const lastSpawn = getPreviousScheduledOccurrence(boss.schedule, now);
  const activeUntil = new Date(lastSpawn.getTime() + SCHEDULED_ACTIVE_WINDOW_MS);
  const defeatedThisCycle = Boolean(lastDefeated && lastDefeated >= lastSpawn && lastDefeated < nextSpawn);
  const isActive = now >= lastSpawn && now < activeUntil && !defeatedThisCycle;
  const remainingMs = nextSpawn.getTime() - now.getTime();
  const activeRemainingMs = activeUntil.getTime() - now.getTime();
  const isWarning = !isActive && remainingMs <= WARNING_WINDOW_MS;

  return {
    ...boss,
    lastDefeated,
    nextSpawn,
    lastSpawn,
    activeUntil,
    defeatedThisCycle,
    isActive,
    urgencyTime: isActive ? lastSpawn.getTime() : nextSpawn.getTime(),
    rowClass: isActive ? "row-active" : isWarning ? "row-warning" : "",
    respawnLabel: formatScheduleText(boss.schedule, now),
    nextSpawnLabel: isActive ? `Active window until ${formatDateTime(activeUntil)}` : formatDateTime(nextSpawn),
    countdownLabel: isActive ? `Window • ${formatCountdown(activeRemainingMs)}` : formatCountdown(remainingMs),
    countdownClass: isActive ? "active" : isWarning ? "warning" : "",
    helperText: isActive
      ? `Spawned ${formatDateTime(lastSpawn)}`
      : defeatedThisCycle
        ? `Defeated ${formatDateTime(lastDefeated)}`
        : "Calculated from the weekly schedule.",
    statusBadge: isActive
      ? '<span class="status-badge active">Scheduled Live</span>'
      : defeatedThisCycle
        ? '<span class="status-badge idle">Defeated</span>'
        : isWarning
          ? '<span class="status-badge warning">Soon</span>'
          : '<span class="status-badge cooldown">Scheduled</span>',
    activeSummary: isActive ? `Ends in ${formatCountdown(activeRemainingMs)}` : formatCountdown(remainingMs),
  };
}

function filterAndSortBosses(bossStates) {
  const filtered = bossStates.filter((boss) => {
    const matchesSearch =
      !uiState.search ||
      boss.name.toLowerCase().includes(uiState.search) ||
      boss.location.toLowerCase().includes(uiState.search);

    if (!matchesSearch) {
      return false;
    }

    if (uiState.filter === "active") {
      return boss.isActive;
    }

    if (uiState.filter === "upcoming") {
      return !boss.isActive && Boolean(boss.nextSpawn);
    }

    if (uiState.filter === "interval") {
      return boss.type === "interval";
    }

    if (uiState.filter === "scheduled") {
      return boss.type === "scheduled";
    }

    return true;
  });

  filtered.sort((left, right) => {
    if (uiState.sort === "alphabetical") {
      return left.name.localeCompare(right.name);
    }

    if (uiState.sort === "level") {
      const leftLevel = Number.isFinite(left.level) ? left.level : Number.POSITIVE_INFINITY;
      const rightLevel = Number.isFinite(right.level) ? right.level : Number.POSITIVE_INFINITY;
      return leftLevel - rightLevel || left.name.localeCompare(right.name);
    }

    const leftPriority = sortPriority(left);
    const rightPriority = sortPriority(right);
    if (leftPriority !== rightPriority) {
      return leftPriority - rightPriority;
    }

    return left.urgencyTime - right.urgencyTime || left.name.localeCompare(right.name);
  });

  return filtered;
}

function sortPriority(boss) {
  if (boss.isActive) {
    return 0;
  }

  if (boss.nextSpawn) {
    return 1;
  }

  return 2;
}

function getActionLockClass() {
  return adminSession.isUnlocked ? "" : "locked";
}

function getNextScheduledOccurrence(schedule, now) {
  const nowTime = now.getTime();
  const currentParts = getUtcPlus8Parts(now);
  const baseMidnight = getUtcPlus8Midnight(now);

  return schedule
    .map((entry) => {
      const dayOffset = (entry.day - currentParts.weekday + 7) % 7;
      const candidate = new Date(
        baseMidnight.getTime() + dayOffset * DAY_MS + entry.hours * HOUR_MS + entry.minutes * MINUTE_MS
      );

      if (candidate.getTime() <= nowTime) {
        return new Date(candidate.getTime() + 7 * DAY_MS);
      }

      return candidate;
    })
    .sort((left, right) => left - right)[0];
}

function getPreviousScheduledOccurrence(schedule, now) {
  const nowTime = now.getTime();
  const currentParts = getUtcPlus8Parts(now);
  const baseMidnight = getUtcPlus8Midnight(now);

  return schedule
    .map((entry) => {
      const dayOffset = (currentParts.weekday - entry.day + 7) % 7;
      const candidate = new Date(
        baseMidnight.getTime() - dayOffset * DAY_MS + entry.hours * HOUR_MS + entry.minutes * MINUTE_MS
      );

      if (candidate.getTime() > nowTime) {
        return new Date(candidate.getTime() - 7 * DAY_MS);
      }

      return candidate;
    })
    .sort((left, right) => right - left)[0];
}

function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatDuration(milliseconds) {
  return formatCountdown(milliseconds);
}

function formatDateTime(date) {
  const parts = formatInDisplayTimeZone(date, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${parts.weekday} ${parts.hour}:${parts.minute}`;
}

function formatClockTime(date) {
  const parts = formatInDisplayTimeZone(date, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${parts.hour}:${parts.minute}:${parts.second}`;
}

function setDefeatTime(bossId, defeatedAt) {
  appState.defeatTimes[bossId] = defeatedAt.toISOString();
  persistState();
  render();
  persistRemoteTimer(bossId, appState.defeatTimes[bossId]);
}

function resetTimer(bossId) {
  delete appState.defeatTimes[bossId];
  persistState();
  render();
  persistRemoteTimer(bossId, null);
}

function runBossAction(action, bossId) {
  if (action === "defeat-now") {
    setDefeatTime(bossId, new Date());
    return;
  }

  if (action === "open-time-modal") {
    openTimeModal(bossId);
    return;
  }

  if (action === "reset-timer") {
    resetTimer(bossId);
  }
}

function ensureAdminAccess(pendingAction) {
  if (adminSession.isUnlocked) {
    return true;
  }

  uiState.pendingAdminAction = pendingAction;
  openAdminModal();
  return false;
}

function openTimeModal(bossId) {
  const boss = bosses.find((item) => item.id === bossId);
  const existingValue = appState.defeatTimes[bossId]
    ? new Date(appState.defeatTimes[bossId])
    : new Date();

  uiState.modalBossId = bossId;
  elements.modalBossId.value = bossId;
  elements.modalTitle.textContent = `Set Defeated Time • ${boss.name}`;
  elements.modalHint.textContent =
    boss.type === "scheduled"
      ? "This stores a last-seen defeat note only. Weekly scheduled spawn calculations still follow the fixed schedule."
      : `Enter the kill time for ${boss.name} to recalculate its ${boss.intervalHours} hour respawn timer.`;
  elements.defeatedAtInput.value = toDateTimeLocalValue(existingValue);
  elements.timeModal.hidden = false;
  elements.defeatedAtInput.focus();
}

function closeTimeModal() {
  uiState.modalBossId = null;
  elements.timeModal.hidden = true;
}

function openAdminModal() {
  elements.adminPinInput.value = "";
  hideAdminError();
  elements.adminModal.hidden = false;
  elements.adminPinInput.focus();
}

function closeAdminModal(clearPendingAction = true) {
  elements.adminModal.hidden = true;
  elements.adminPinInput.value = "";
  hideAdminError();
  if (clearPendingAction) {
    uiState.pendingAdminAction = null;
  }
}

function handleAdminUnlock(event) {
  event.preventDefault();
  if (elements.adminPinInput.value !== ADMIN_PIN) {
    showAdminError("Incorrect PIN. Please try again.");
    elements.adminPinInput.select();
    return;
  }

  adminSession = { isUnlocked: true };
  persistAdminSession();
  closeAdminModal(false);
  render();
  runPendingAdminAction();
}

function runPendingAdminAction() {
  const pendingAction = uiState.pendingAdminAction;
  uiState.pendingAdminAction = null;

  if (!pendingAction) {
    return;
  }

  if (pendingAction.action === "save-time") {
    setDefeatTime(pendingAction.bossId, new Date(pendingAction.defeatedAt));
    closeTimeModal();
    return;
  }

  runBossAction(pendingAction.action, pendingAction.bossId);
}

function lockAdminSession() {
  adminSession = { isUnlocked: false };
  persistAdminSession();
  closeAdminModal();
  closeTimeModal();
  render();
}

function renderAdminAccess() {
  if (adminSession.isUnlocked) {
    elements.adminStatus.textContent = "Editing unlocked for this browser tab. Defeated, backfill, and reset actions are enabled.";
    elements.adminToggleButton.textContent = "Editing Unlocked";
    elements.adminLogoutButton.hidden = false;
    return;
  }

  elements.adminStatus.textContent = "Editing locked. Enter the admin PIN to update timers.";
  elements.adminToggleButton.textContent = "Enter Admin PIN";
  elements.adminLogoutButton.hidden = true;
}

function showAdminError(message) {
  elements.adminPinError.hidden = false;
  elements.adminPinError.textContent = message;
}

function hideAdminError() {
  elements.adminPinError.hidden = true;
  elements.adminPinError.textContent = "";
}

function toDateTimeLocalValue(date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

function syncFilterButtons() {
  const buttons = elements.filterGroup.querySelectorAll("[data-filter]");
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === uiState.filter);
  });
}

function loadState() {
  const presetDefeatTimes = createPresetDefeatTimes(new Date());
  const fallbackState = { seedVersion: PRESET_STATE_VERSION, defeatTimes: presetDefeatTimes };
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return fallbackState;
  }

  try {
    const parsed = JSON.parse(raw);
    const defeatTimes =
      parsed &&
      typeof parsed === "object" &&
      parsed.defeatTimes &&
      typeof parsed.defeatTimes === "object"
        ? parsed.defeatTimes
        : {};
    const seedVersion =
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.seedVersion === "string"
        ? parsed.seedVersion
        : null;

    if (seedVersion === PRESET_STATE_VERSION) {
      return { seedVersion, defeatTimes };
    }

    return {
      seedVersion: PRESET_STATE_VERSION,
      defeatTimes: { ...presetDefeatTimes, ...defeatTimes },
    };
  } catch (error) {
    window.localStorage.removeItem(STORAGE_KEY);
    showStorageNotice("Saved tracker data was corrupted and has been cleared.");
    return fallbackState;
  }
}

function loadAdminSession() {
  return {
    isUnlocked: window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "unlocked",
  };
}

function persistAdminSession() {
  if (adminSession.isUnlocked) {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "unlocked");
    return;
  }

  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

function persistState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    hideStorageNotice();
  } catch (error) {
    showStorageNotice("Unable to save tracker data in local storage on this browser.");
  }
}

function showStorageNotice(message) {
  elements.storageNotice.hidden = false;
  elements.storageNotice.textContent = message;
}

function hideStorageNotice() {
  elements.storageNotice.hidden = true;
  elements.storageNotice.textContent = "";
}

function initializeSupabaseClient() {
  if (!window.supabase || !SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    remoteSyncState = {
      enabled: false,
      writable: false,
      loading: false,
      message: "Supabase sync is disabled. Add your project URL and publishable key to enable shared timers.",
    };
    return;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  remoteSyncState = {
    enabled: true,
    writable: false,
    loading: true,
    message: "Supabase sync is loading shared timers...",
  };
}

async function initializeRemoteSync() {
  if (!supabaseClient) {
    render();
    return;
  }

  remoteSyncState.loading = true;
  remoteSyncState.message = "Supabase sync is loading shared timers...";
  render();

  await loadRemoteTimers();
}

async function loadRemoteTimers() {
  const { data, error } = await supabaseClient
    .from("boss_timers")
    .select("boss_id, defeated_at")
    .order("boss_id", { ascending: true });

  if (error) {
    remoteSyncState.loading = false;
    remoteSyncState.message = "Supabase sync could not load shared timers. Using local browser data instead.";
    showStorageNotice(`Supabase read failed: ${error.message}`);
    render();
    return;
  }

  applyRemoteTimers(data || []);
  remoteSyncState.loading = false;
  remoteSyncState.message = "Supabase sync is active for shared reads. Local preset timers stay visible until shared Supabase timer values are written.";
  persistState();
  hideStorageNotice();
  render();
}

function applyRemoteTimers(rows) {
  const hasTrackedRemoteTimers = rows.some((row) => Boolean(row.defeated_at));
  const presetDefeatTimes = createPresetDefeatTimes(new Date());

  if (!hasTrackedRemoteTimers) {
    Object.entries(presetDefeatTimes).forEach(([bossId, defeatedAt]) => {
      if (!appState.defeatTimes[bossId]) {
        appState.defeatTimes[bossId] = defeatedAt;
      }
    });
  }

  rows.forEach((row) => {
    if (row.defeated_at) {
      appState.defeatTimes[row.boss_id] = row.defeated_at;
      return;
    }

    if (hasTrackedRemoteTimers) {
      delete appState.defeatTimes[row.boss_id];
    }
  });
}

async function persistRemoteTimer(bossId, defeatedAt) {
  if (!supabaseClient) {
    return;
  }

  const payload = {
    boss_id: bossId,
    defeated_at: defeatedAt,
    updated_at: new Date().toISOString(),
    updated_by: adminSession.isUnlocked ? "website-admin" : "website",
  };

  const { error } = await supabaseClient
    .from("boss_timers")
    .upsert(payload, { onConflict: "boss_id" });

  if (error) {
    remoteSyncState.writable = false;
    remoteSyncState.message = "Supabase reads are active, but remote writes are blocked until insert/update RLS policies are added.";
    showStorageNotice(`Supabase write failed: ${error.message}`);
    render();
    return;
  }

  remoteSyncState.writable = true;
  remoteSyncState.message = "Supabase sync is active for shared reads and writes.";
  hideStorageNotice();
  render();
}

function formatScheduleText(schedule, now) {
  return schedule
    .map((entry) => formatDateTime(getNextScheduledOccurrence([entry], now)))
    .join(", ");
}

function createInitialDisplayTimeZone() {
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  return {
    timeZone: browserTimeZone,
    shortLabel: TIMEZONE_SHORT_LABELS[browserTimeZone] || getTimeZoneShortName(new Date(), browserTimeZone),
    source: "browser",
  };
}

function getCurrentTimeNote() {
  const sourceText =
    displayTimeZone.source === "ip"
      ? `your connection-detected timezone (${displayTimeZone.shortLabel})`
      : `your browser timezone (${displayTimeZone.shortLabel})`;

  return `Spawn slots are converted using ${sourceText} from the original UTC+8 schedule. Weekly bosses stay highlighted for 2 hours after their scheduled spawn.`;
}

async function detectIpTimeZone() {
  if (isDetectingIpTimeZone) {
    return;
  }

  isDetectingIpTimeZone = true;

  try {
    const response = await fetch("https://ipwho.is/?fields=success,country_code,timezone");
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    if (!data.success || !data.timezone || !data.timezone.id) {
      return;
    }

    displayTimeZone.timeZone = data.timezone.id;
    displayTimeZone.shortLabel =
      TIMEZONE_SHORT_LABELS[data.timezone.id] || data.timezone.abbr || getTimeZoneShortName(new Date(), data.timezone.id);
    displayTimeZone.source = "ip";
    render();
  } catch (error) {
    console.warn("IP timezone detection failed. Falling back to browser timezone.", error);
  } finally {
    isDetectingIpTimeZone = false;
  }
}

function getTimeZoneShortName(date, timeZone) {
  const part = new Intl.DateTimeFormat(undefined, {
    timeZone,
    timeZoneName: "short",
  })
    .formatToParts(date)
    .find((item) => item.type === "timeZoneName");

  return part ? part.value : "Local";
}

function formatInDisplayTimeZone(date, options) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: displayTimeZone.timeZone,
    hour12: false,
    ...options,
  });
  const parts = formatter.formatToParts(date);

  return parts.reduce((result, part) => {
    if (part.type !== "literal") {
      result[part.type] = part.value;
    }

    return result;
  }, {});
}

function createPresetDefeatTimes(now) {
  const defeatTimes = {};

  PRESET_INTERVAL_SPAWNS.forEach(([name, timeLabel]) => {
    const bossId = resolvePresetBossId(name);
    const boss = bosses.find((entry) => entry.id === bossId);
    if (!boss || boss.type !== "interval") {
      console.warn(`Preset spawn entry "${name}" could not be matched to an interval boss.`);
      return;
    }

    const nextSpawn = getNextUtcPlus8TimeOccurrence(timeLabel, now);
    defeatTimes[boss.id] = new Date(nextSpawn.getTime() - boss.intervalMs).toISOString();
  });

  return defeatTimes;
}

function resolvePresetBossId(name) {
  return PRESET_ALIASES[normalizeBossName(name)] || null;
}

function normalizeBossName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getNextUtcPlus8TimeOccurrence(timeLabel, now) {
  const [hours, minutes] = timeLabel.split(":").map(Number);
  const baseMidnight = getUtcPlus8Midnight(now);
  const candidate = new Date(baseMidnight.getTime() + hours * HOUR_MS + minutes * MINUTE_MS);

  if (candidate.getTime() <= now.getTime()) {
    return new Date(candidate.getTime() + DAY_MS);
  }

  return candidate;
}

function getUtcPlus8Midnight(date) {
  const parts = getUtcPlus8Parts(date);
  return buildUtcPlus8Date(parts.year, parts.month, parts.day, 0, 0, 0);
}

function getUtcPlus8Parts(date) {
  const shifted = new Date(date.getTime() + UTC_PLUS_8_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(),
    day: shifted.getUTCDate(),
    weekday: shifted.getUTCDay(),
    hours: shifted.getUTCHours(),
    minutes: shifted.getUTCMinutes(),
    seconds: shifted.getUTCSeconds(),
  };
}

function buildUtcPlus8Date(year, month, day, hours, minutes, seconds) {
  return new Date(Date.UTC(year, month, day, hours - 8, minutes, seconds, 0));
}
