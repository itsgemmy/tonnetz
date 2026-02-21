(() => {
  const HOST_ID = "tonnetz-root-host";
  let isOpen = false; // our curr toggle state

  // helper: are we on a watch page?
  function onWatchPage() {
    return location.pathname === "/watch";
  }

  // creating Shadow DOM host + panel if missing
  function ensurePanel() {
    let host = document.getElementById(HOST_ID);
    if (!host) {
      host = document.createElement("div");
      host.id = HOST_ID;
      host.style.position = "fixed";
      host.style.top = "72px";
      host.style.right = "16px";
      host.style.zIndex = "2147483647";
      host.style.width = "420px";
      host.style.height = "300px";
      host.style.pointerEvents = "auto";
      document.documentElement.appendChild(host);

      const shadow = host.attachShadow({ mode: "open" });

      // panel content
      const panel = document.createElement("div");
      panel.setAttribute("data-tonnetz", "panel");
      panel.style.fontFamily = "Inter, system-ui, sans-serif";
      panel.style.background = "rgba(18,18,18,.96)";
      panel.style.color = "#fff";
      panel.style.borderRadius = "14px";
      panel.style.boxShadow = "0 8px 24px rgba(0,0,0,.28)";
      panel.style.border = "1px solid rgba(255,255,255,.1)";
      panel.style.overflow = "hidden";
      panel.style.height = "100%";
      panel.style.display = "flex";
      panel.style.flexDirection = "column";

      const header = document.createElement("div");
      header.style.display = "flex";
      header.style.alignItems = "center";
      header.style.gap = "8px";
      header.style.padding = "8px 12px";
      header.style.borderBottom = "1px solid rgba(255,255,255,.08)";
      header.innerHTML = `
        <strong style="flex:1">Tonnetz</strong>
        <button id="tnz-close" style="background:transparent;border:0;color:white;cursor:pointer;font-size:16px;">×</button>
      `;

      const body = document.createElement("div");
      body.style.padding = "12px";
      body.style.flex = "1";
      body.innerHTML = `
        <div style="opacity:.7;font-size:12px;margin-bottom:8px">Status</div>
        <div id="tnz-status" style="font-size:14px;word-break:break-all;"></div>
        <div style="margin-top:12px;height:140px;background:rgba(255,255,255,.04);border-radius:10px;display:flex;align-items:center;justify-content:center;">
          <div style="opacity:.7">Your visualization goes here</div>
        </div>
      `;

      panel.appendChild(header);
      panel.appendChild(body);
      shadow.appendChild(panel);

      // close button
      shadow.getElementById("tnz-close").addEventListener("click", () => {
        removePanel();
        isOpen = false;
      });
    }

    // Update dynamic info each time we attach
    const vid = new URL(location.href).searchParams.get("v");
    const shadow = document.getElementById(HOST_ID)?.shadowRoot;
    const status = shadow?.getElementById("tnz-status");
    if (status) {
      status.textContent = onWatchPage()
        ? vid
          ? `On Watch page. Video ID: ${vid}`
          : "On Watch page. No video ID found."
        : "Not on a Watch page.";
    }
  }

  function removePanel() {
    const host = document.getElementById(HOST_ID);
    if (host) host.remove();
  }

  function togglePanel() {
    if (!onWatchPage()) {
      isOpen = false;
      removePanel();
      return;
    }

    if (document.getElementById(HOST_ID)) {
      removePanel();
      isOpen = false;
    } else {
      ensurePanel();
      isOpen = true;
    }
  }

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type === "TONNETZ_TOGGLE_PANEL") {
      togglePanel();
    }
  });

  function attachNavListeners() {
    const reattachIfNeeded = () => {
      if (isOpen) {
        if (onWatchPage()) ensurePanel();
        else removePanel();
      }
    };

    window.addEventListener("yt-navigate-finish", () => {
      setTimeout(reattachIfNeeded, 0);
    });
    window.addEventListener("yt-page-data-updated", () =>
      setTimeout(reattachIfNeeded, 0),
    );

    const app = document.querySelector("ytd-app") || document.documentElement;
    const mo = new MutationObserver(() => {
      if (isOpen) {
        if (onWatchPage() && !document.getElementById(HOST_ID)) ensurePanel();
        if (!onWatchPage() && document.getElementById(HOST_ID)) removePanel();
      }
    });
    mo.observe(app, { childList: true, subtree: true });
  }

  attachNavListeners();
})();
