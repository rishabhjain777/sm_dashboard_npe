// ── AI Analytics, Retrospective & Todos Engine ──────────────────────
function switchRetroDate(selectedDate) {
    document.querySelectorAll(".retro-date-panel").forEach(p => p.style.display = "none");
    const target = document.getElementById("retroPanel-" + selectedDate);
    if (target) {
        target.style.display = "block";
    }
}

const TODO_STORAGE_KEY = "fno_retrospective_todos_state_v1";
const CUSTOM_TODO_KEY = "fno_custom_todos_v1";
let currentStatusFilter = "all";

function getSavedTodoState() {
    try {
        const raw = localStorage.getItem(TODO_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch(e) {
        return {};
    }
}

function saveTodoState(state) {
    try {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(state));
    } catch(e) {}
}

function getCustomTodos() {
    try {
        const raw = localStorage.getItem(CUSTOM_TODO_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch(e) {
        return [];
    }
}

function toggleTodoStatus(todoId) {
    const state = getSavedTodoState();
    state[todoId] = !state[todoId];
    saveTodoState(state);
    updateTodoItemUI(todoId, state[todoId]);
    updateTodoCounters();
}

function updateTodoItemUI(todoId, isDone) {
    const item = document.getElementById("todo-item-" + todoId);
    const cb = document.getElementById("todo-cb-" + todoId);
    if (!item) return;

    if (isDone) {
        item.classList.add("completed");
        if (cb) cb.checked = true;
    } else {
        item.classList.remove("completed");
        if (cb) cb.checked = false;
    }
}

function updateTodoCounters() {
    const items = document.querySelectorAll(".todo-item");
    let completed = 0;
    items.forEach(it => {
        if (it.classList.contains("completed")) completed++;
    });
    const total = items.length;
    const pending = total - completed;

    const navBadge = document.getElementById("nav-todos-badge");
    if (navBadge) navBadge.textContent = pending;
}

window.initAnalyticsTab = function() {
    // Quant UI hooks
};

window.initRetroTab = function() {
    // Retrospective tab hooks
};

window.initTodosTab = function() {
    // Restore saved todo states
    const state = getSavedTodoState();
    Object.keys(state).forEach(id => {
        if (state[id]) updateTodoItemUI(id, true);
    });
    updateTodoCounters();
};

// ── AI Quant Predictions Client Logic ──
window.QUANT_STOCKS_DATA = {"SILVER":{"sym":"SILVER","comp":"Aditya Birla Sun Life Silver ETF","spot":"\u20b9225,877.00","basis":0.0,"lot":"30","intra":{"buy":55.5,"sell":20.0,"sig":"BUY","conf":66.0,"rs":0.0,"range_pos":64.6,"factors":["Trading above Central Pivot (Rs.225,595.7)","Institutional Long Buildup (Price \u2191, OI \u2191)"]},"st":{"buy":55.5,"sell":26.5,"sig":"BUY","conf":60.1,"oi_yest":0.0,"tech":50.0,"q":50.0,"g":50.0,"v":50.0,"oneliner":"nan","factors":["Multi-day price base above Floor Pivot","Persistent Long buildup across cycles"]},"risk":{"level":"LOW","span":1.3,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":225595.67,"r1":227177.33,"s1":224295.33,"zone":"P-R1"}},"GOLD":{"sym":"GOLD","comp":"Senco Gold","spot":"\u20b9147,866.00","basis":0.0,"lot":"1","intra":{"buy":64.5,"sell":17.5,"sig":"BUY","conf":76.3,"rs":0.0,"range_pos":76.6,"factors":["Trading above Central Pivot (Rs.147,650.0)","Trading near session highs (77% of range)","Institutional Long Buildup (Price \u2191, OI \u2191)","Call option premium skew (CE > PE)"]},"st":{"buy":56.3,"sell":27.0,"sig":"BUY","conf":67.4,"oi_yest":0.0,"tech":20.0,"q":67.0,"g":89.0,"v":71.0,"oneliner":"Average Financial Strength, High Growth Trend Stock at Attractive Valuations","factors":["Multi-day price base above Floor Pivot","Persistent Long buildup across cycles","Superior Quality & Growth profile (Q: 67, G: 89)","Favorable valuation margin of safety (Val: 71)"]},"risk":{"level":"LOW","span":0.8,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":147650.0,"r1":148366.0,"s1":147150.0,"zone":"P-R1"}},"CRUDEOIL":{"sym":"CRUDEOIL","comp":"CRUDEOIL","spot":"\u20b98,916.00","basis":0.0,"lot":"100","intra":{"buy":59.5,"sell":20.0,"sig":"BUY","conf":69.6,"rs":0.0,"range_pos":77.5,"factors":["Trading above Central Pivot (Rs.8,825.3)","Trading near session highs (78% of range)","Institutional Long Buildup (Price \u2191, OI \u2191)"]},"st":{"buy":60.5,"sell":31.5,"sig":"BUY","conf":60.1,"oi_yest":0.0,"tech":50.0,"q":50.0,"g":50.0,"v":50.0,"oneliner":"nan","factors":["Multi-day price base above Floor Pivot","Persistent Long buildup across cycles","Substantial hurdle-free runway to R2 (+4.5%)"]},"risk":{"level":"MODERATE","span":5.8,"flags":["High intraday volatility (5.8% daily range)"]},"pivots":{"p":8825.33,"r1":9117.67,"s1":8623.67,"zone":"P-R1"}},"ZINC":{"sym":"ZINC","comp":"Hindustan Zinc","spot":"\u20b9410.60","basis":0.0,"lot":"5","intra":{"buy":22.5,"sell":59.5,"sig":"SELL","conf":67.3,"rs":0.0,"range_pos":23.9,"factors":["Trading below Central Pivot (Rs.412.2)","Trading right at session lows (24% of range)","Aggressive Short Buildup (Price \u2193, OI \u2191)"]},"st":{"buy":39.9,"sell":54.9,"sig":"NEUTRAL","conf":54.5,"oi_yest":0.0,"tech":20.0,"q":90.0,"g":91.0,"v":65.0,"oneliner":"Superior Financial Strength, High Growth Trend Stock at Reasonable Valuations","factors":["Deteriorating structural chart trend (Tech: 20/100)","Multi-day price breakdown below Floor Pivot","Continuous Short buildup across cycles"]},"risk":{"level":"LOW","span":2.3,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":412.23,"r1":416.12,"s1":406.72,"zone":"S1-P"}},"NATURALGAS":{"sym":"NATURALGAS","comp":"Shri Ahimsa Naturals","spot":"\u20b9287.50","basis":0.0,"lot":"1250","intra":{"buy":20.0,"sell":55.5,"sig":"SELL","conf":66.0,"rs":0.0,"range_pos":32.4,"factors":["Trading below Central Pivot (Rs.288.3)","Aggressive Short Buildup (Price \u2193, OI \u2191)"]},"st":{"buy":52.2,"sell":46.2,"sig":"NEUTRAL","conf":39.4,"oi_yest":0.0,"tech":100.0,"q":100.0,"g":100.0,"v":24.0,"oneliner":"Superior Financial Strength, High Growth Trend Stock Priced at High Valuations","factors":["Strong structural technical posture (Tech: 100/100)","Superior Quality & Growth profile (Q: 100, G: 100)","Substantial hurdle-free runway to R2 (+2.6%)"]},"risk":{"level":"LOW","span":2.4,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":288.3,"r1":291.3,"s1":284.5,"zone":"S1-P"}},"COPPER":{"sym":"COPPER","comp":"Hindustan Copper","spot":"\u20b91,399.60","basis":0.0,"lot":"2500","intra":{"buy":50.5,"sell":23.0,"sig":"NEUTRAL","conf":58.8,"rs":0.0,"range_pos":53.9,"factors":["Trading above Central Pivot (Rs.1,399.1)","Institutional Long Buildup (Price \u2191, OI \u2191)"]},"st":{"buy":53.3,"sell":33.3,"sig":"NEUTRAL","conf":59.0,"oi_yest":0.0,"tech":20.0,"q":81.0,"g":89.0,"v":24.0,"oneliner":"Superior Financial Strength, High Growth Trend Stock Priced at High Valuations","factors":["Multi-day price base above Floor Pivot","Persistent Long buildup across cycles","Superior Quality & Growth profile (Q: 81, G: 89)"]},"risk":{"level":"LOW","span":1.3,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":1399.13,"r1":1408.32,"s1":1390.42,"zone":"P-R1"}},"ALUMINIUM":{"sym":"ALUMINIUM","comp":"Vedanta Aluminium Metal","spot":"\u20b9336.60","basis":0.0,"lot":"5","intra":{"buy":20.0,"sell":62.0,"sig":"SELL","conf":71.8,"rs":0.0,"range_pos":16.7,"factors":["Trading below Central Pivot (Rs.337.5)","Trading right at session lows (17% of range)","Aggressive Short Buildup (Price \u2193, OI \u2191)"]},"st":{"buy":31.8,"sell":54.4,"sig":"NEUTRAL","conf":61.3,"oi_yest":0.0,"tech":60.0,"q":69.0,"g":11.0,"v":35.0,"oneliner":"Average Financial Strength, Low Growth Trend Stock Priced at Expensive Valuations","factors":["Multi-day price breakdown below Floor Pivot","Continuous Short buildup across cycles","Elevated valuation multiples / high derating risk (Val: 35)"]},"risk":{"level":"LOW","span":1.3,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":337.53,"r1":339.17,"s1":334.97,"zone":"S1-P"}},"LEAD":{"sym":"LEAD","comp":"LEAP India","spot":"\u20b9192.20","basis":0.0,"lot":"5","intra":{"buy":23.0,"sell":53.0,"sig":"NEUTRAL","conf":61.0,"rs":0.0,"range_pos":47.8,"factors":["Trading below Central Pivot (Rs.192.2)","Aggressive Short Buildup (Price \u2193, OI \u2191)"]},"st":{"buy":31.3,"sell":60.4,"sig":"SELL","conf":67.2,"oi_yest":0.0,"tech":40.0,"q":62.0,"g":76.0,"v":24.0,"oneliner":"Average Financial Strength, High Growth Trend Stock Priced at High Valuations","factors":["Multi-day price breakdown below Floor Pivot","Continuous Short buildup across cycles","Elevated valuation multiples / high derating risk (Val: 24)"]},"risk":{"level":"LOW","span":1.8,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":192.25,"r1":193.95,"s1":190.5,"zone":"S1-P"}}};

let quantSortDirections = {};

function filterQuantTable() {
    const query = (document.getElementById("quantSearchInput") ? document.getElementById("quantSearchInput").value : "").trim().toLowerCase();
    const sigFilter = document.getElementById("quantSignalFilter") ? document.getElementById("quantSignalFilter").value : "ALL";
    const riskFilter = document.getElementById("quantRiskFilter") ? document.getElementById("quantRiskFilter").value : "ALL";
    
    const tbody = document.getElementById("quantTableBody");
    if (!tbody) return;
    const rows = tbody.querySelectorAll("tr");
    let visibleCount = 0;
    
    rows.forEach(row => {
        const sym = (row.getAttribute("data-symbol") || "").toLowerCase();
        const comp = (row.getAttribute("data-company") || "").toLowerCase();
        const isig = row.getAttribute("data-isig") || "";
        const stsig = row.getAttribute("data-stsig") || "";
        const risk = row.getAttribute("data-risk") || "";
        
        let matchSearch = !query || sym.includes(query) || comp.includes(query);
        
        let matchSig = true;
        if (sigFilter === "BUY_ANY") {
            matchSig = isig.includes("BUY") || stsig.includes("BUY");
        } else if (sigFilter === "SELL_ANY") {
            matchSig = isig.includes("SELL") || stsig.includes("SELL");
        } else if (sigFilter === "STRONG_ONLY") {
            matchSig = isig.includes("STRONG") || stsig.includes("STRONG");
        } else if (sigFilter === "INTRA_BUY") {
            matchSig = isig.includes("BUY");
        } else if (sigFilter === "INTRA_SELL") {
            matchSig = isig.includes("SELL");
        } else if (sigFilter === "ST_BUY") {
            matchSig = stsig.includes("BUY");
        } else if (sigFilter === "ST_SELL") {
            matchSig = stsig.includes("SELL");
        }
        
        let matchRisk = (riskFilter === "ALL") || (risk === riskFilter);
        
        if (matchSearch && matchSig && matchRisk) {
            row.style.display = "";
            visibleCount++;
        } else {
            row.style.display = "none";
        }
    });
    
    const countBadge = document.getElementById("quantVisibleCount");
    if (countBadge) {
        countBadge.innerText = `Showing ${visibleCount} of ${rows.length}`;
    }
}

function setQuantView(mode) {
    document.querySelectorAll(".quant-view-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById("btnView" + mode.charAt(0).toUpperCase() + mode.slice(1));
    if (activeBtn) activeBtn.classList.add("active");
    
    const table = document.getElementById("quantPredTable");
    if (!table) return;
    
    const intraCols = table.querySelectorAll(".col-intra");
    const stCols = table.querySelectorAll(".col-st");
    
    if (mode === "intra") {
        intraCols.forEach(el => el.style.display = "");
        stCols.forEach(el => el.style.display = "none");
    } else if (mode === "st") {
        intraCols.forEach(el => el.style.display = "none");
        stCols.forEach(el => el.style.display = "");
    } else {
        intraCols.forEach(el => el.style.display = "");
        stCols.forEach(el => el.style.display = "");
    }
}

function sortQuantTable(colIdx, isNumeric) {
    const tbody = document.getElementById("quantTableBody");
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    
    const currentDir = quantSortDirections[colIdx] || "asc";
    const newDir = currentDir === "asc" ? "desc" : "asc";
    quantSortDirections[colIdx] = newDir;
    
    rows.sort((a, b) => {
        let aVal = a.cells[colIdx] ? (a.cells[colIdx].getAttribute("data-val") || a.cells[colIdx].innerText) : "";
        let bVal = b.cells[colIdx] ? (b.cells[colIdx].getAttribute("data-val") || b.cells[colIdx].innerText) : "";
        
        if (isNumeric) {
            let aNum = parseFloat(aVal.replace(/[^0-9.-]/g, "")) || 0;
            let bNum = parseFloat(bVal.replace(/[^0-9.-]/g, "")) || 0;
            return newDir === "asc" ? aNum - bNum : bNum - aNum;
        } else {
            return newDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
    });
    
    rows.forEach(row => tbody.appendChild(row));
}

function openQuantModal(symbol) {
    const data = window.QUANT_STOCKS_DATA ? window.QUANT_STOCKS_DATA[symbol] : null;
    if (!data) return;
    
    document.getElementById("modalSymbol").innerText = data.sym;
    document.getElementById("modalSpot").innerText = data.spot;
    document.getElementById("modalCompany").innerText = data.comp + " | Lot: " + data.lot;
    
    const basisBadge = document.getElementById("modalBasisBadge");
    basisBadge.innerText = "Basis: " + (data.basis >= 0 ? "+" : "") + data.basis.toFixed(2) + "%";
    basisBadge.className = "quant-sig-pill " + (data.basis > 0 ? "sig-buy" : (data.basis < 0 ? "sig-sell" : "sig-neutral"));
    
    // Intraday
    document.getElementById("modalIntraBuy").innerText = data.intra.buy.toFixed(1) + " / 100";
    document.getElementById("modalIntraSell").innerText = data.intra.sell.toFixed(1) + " / 100";
    document.getElementById("modalIntraConf").innerText = data.intra.conf.toFixed(0) + "%";
    document.getElementById("modalIntraRS").innerText = (data.intra.rs >= 0 ? "+" : "") + data.intra.rs.toFixed(2) + "% vs NIFTY";
    document.getElementById("modalIntraRange").innerText = data.intra.range_pos.toFixed(0) + "% (0% Low - 100% High)";
    document.getElementById("modalIntraPivots").innerText = "P: ₹" + data.pivots.p + " | S1: ₹" + data.pivots.s1 + " | R1: ₹" + data.pivots.r1;
    
    const intraSigBadge = document.getElementById("modalIntraSignalBadge");
    intraSigBadge.innerText = data.intra.sig;
    intraSigBadge.className = "quant-sig-pill sig-" + data.intra.sig.toLowerCase().replace(" ", "-");
    
    const intraFactorsUl = document.getElementById("modalIntraFactors");
    intraFactorsUl.innerHTML = (data.intra.factors && data.intra.factors.length > 0)
        ? data.intra.factors.map(f => `<li>${f}</li>`).join("")
        : "<li>Balanced intraday metrics</li>";

    // Short-Term
    document.getElementById("modalSTBuy").innerText = data.st.buy.toFixed(1) + " / 100";
    document.getElementById("modalSTSell").innerText = data.st.sell.toFixed(1) + " / 100";
    document.getElementById("modalSTConf").innerText = data.st.conf.toFixed(0) + "%";
    document.getElementById("modalSTOI").innerText = (data.st.oi_yest >= 0 ? "+" : "") + data.st.oi_yest.toFixed(1) + "% DoD";
    document.getElementById("modalSTTech").innerText = data.st.tech + " / 100";
    document.getElementById("modalSTFund").innerText = `Q: ${data.st.q} | G: ${data.st.g} | V: ${data.st.v}`;
    
    const stSigBadge = document.getElementById("modalSTSignalBadge");
    stSigBadge.innerText = data.st.sig;
    stSigBadge.className = "quant-sig-pill sig-" + data.st.sig.toLowerCase().replace(" ", "-");
    
    const stFactorsUl = document.getElementById("modalSTFactors");
    stFactorsUl.innerHTML = (data.st.factors && data.st.factors.length > 0)
        ? data.st.factors.map(f => `<li>${f}</li>`).join("")
        : "<li>Equilibrium multi-day swing metrics</li>";

    // Risk
    const riskBadge = document.getElementById("modalRiskBadge");
    riskBadge.innerText = data.risk.level + " RISK";
    riskBadge.className = "quant-risk-badge risk-" + data.risk.level.toLowerCase();
    document.getElementById("modalRangeSpan").innerText = data.risk.span.toFixed(1) + "% of stock price";
    document.getElementById("modalOptSkew").innerText = "Zone: " + data.pivots.zone;
    
    const riskFlagsUl = document.getElementById("modalRiskFlags");
    riskFlagsUl.innerHTML = (data.risk.flags && data.risk.flags.length > 0)
        ? data.risk.flags.map(f => `<li>${f}</li>`).join("")
        : "<li>Normal parameters</li>";
        
    document.getElementById("quantModalBackdrop").classList.add("active");
}

function closeQuantModal() {
    const modal = document.getElementById("quantModalBackdrop");
    if (modal) modal.classList.remove("active");
}

function closeQuantModalOnBackdrop(e) {
    if (e.target.id === "quantModalBackdrop") {
        closeQuantModal();
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeQuantModal();
});