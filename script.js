// SDK Init
const defaultConfig = {
  background_color: "#F8FAFD",
  surface_color: "#FFFFFF",
  text_color: "#0B1D3A",
  primary_action_color: "#F57C00",
  secondary_action_color: "#1565C0",
  font_family: "Outfit",
  font_size: 16,
  hero_headline: "Fast & Reliable Cargo Delivery from Nepal to the World",
  hero_subtext:
    "Connecting Nepal to 150+ countries with safe, affordable, and on-time shipping for individuals and businesses.",
  services_title: "Our Services",
  cta_headline: "Ready to Ship Your Cargo?",
  cta_subtext:
    "Get an instant quote or talk to our logistics experts. Fast, safe, and affordable — every time.",
};

function applyConfig(c) {
  const el = (id) => document.getElementById(id);
  if (el("heroHeadline"))
    el("heroHeadline").textContent =
      c.hero_headline || defaultConfig.hero_headline;
  if (el("heroSubtext"))
    el("heroSubtext").textContent =
      c.hero_subtext || defaultConfig.hero_subtext;
  if (el("servicesTitle"))
    el("servicesTitle").textContent =
      c.services_title || defaultConfig.services_title;
  if (el("ctaHeadline"))
    el("ctaHeadline").textContent =
      c.cta_headline || defaultConfig.cta_headline;
  if (el("ctaSubtext"))
    el("ctaSubtext").textContent =
      c.cta_subtext || defaultConfig.cta_subtext;

  // Apply colors dynamically
  document.querySelector('.app-root').style.backgroundColor = c.background_color || defaultConfig.background_color;
  document.querySelector('.app-root').style.color = c.text_color || defaultConfig.text_color;
  document.body.style.backgroundColor = c.background_color || defaultConfig.background_color;
  document.body.style.color = c.text_color || defaultConfig.text_color;

  // Update surface elements (cards, forms, etc.)
  document.querySelectorAll('[style*="background: white"], [style*="background:#f8fafd"], .card-hover, form input, form select, form textarea').forEach(el => {
    el.style.backgroundColor = c.surface_color || defaultConfig.surface_color;
  });

  // Update buttons with primary/secondary colors
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.style.backgroundColor = c.primary_action_color || defaultConfig.primary_action_color;
  });
  document.querySelectorAll('.btn-secondary').forEach(btn => {
    btn.style.backgroundColor = c.secondary_action_color || defaultConfig.secondary_action_color;
    btn.style.borderColor = c.secondary_action_color || defaultConfig.secondary_action_color;
    btn.style.color = c.text_color || defaultConfig.text_color;
  });

  const font = c.font_family || defaultConfig.font_family;
  document
    .querySelectorAll(".font-heading, h1, h2, h3, h4")
    .forEach((e) => {
      e.style.fontFamily = `${font}, Outfit, sans-serif`;
    });
  const size = c.font_size || defaultConfig.font_size;
  document.querySelectorAll("p, .text-sm, .text-xs").forEach((e) => {
    if (e.classList.contains("text-xs"))
      e.style.fontSize = `${size * 0.75}px`;
    else e.style.fontSize = `${size}px`;
  });
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => applyConfig(config),
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () =>
            config.background_color || defaultConfig.background_color,
          set: (v) => {
            config.background_color = v;
            window.elementSdk.setConfig({ background_color: v });
          },
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (v) => {
            config.surface_color = v;
            window.elementSdk.setConfig({ surface_color: v });
          },
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (v) => {
            config.text_color = v;
            window.elementSdk.setConfig({ text_color: v });
          },
        },
        {
          get: () =>
            config.primary_action_color ||
            defaultConfig.primary_action_color,
          set: (v) => {
            config.primary_action_color = v;
            window.elementSdk.setConfig({ primary_action_color: v });
          },
        },
        {
          get: () =>
            config.secondary_action_color ||
            defaultConfig.secondary_action_color,
          set: (v) => {
            config.secondary_action_color = v;
            window.elementSdk.setConfig({ secondary_action_color: v });
          },
        },
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => {
          config.font_family = v;
          window.elementSdk.setConfig({ font_family: v });
        },
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => {
          config.font_size = v;
          window.elementSdk.setConfig({ font_size: v });
        },
      },
    }),
    mapToEditPanelValues: (config) =>
      new Map([
        [
          "hero_headline",
          config.hero_headline || defaultConfig.hero_headline,
        ],
        [
          "hero_subtext",
          config.hero_subtext || defaultConfig.hero_subtext,
        ],
        [
          "services_title",
          config.services_title || defaultConfig.services_title,
        ],
        [
          "cta_headline",
          config.cta_headline || defaultConfig.cta_headline,
        ],
        ["cta_subtext", config.cta_subtext || defaultConfig.cta_subtext],
      ]),
  });
}

// Mobile menu
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("hidden");
});

// Track shipment - Real API
document.getElementById("trackBtn").addEventListener("click", async () => {
  const trackingNumber = document.getElementById("trackInput").value.trim();
  const res = document.getElementById("trackResult");
  
  if (!trackingNumber) {
    res.innerHTML = '<div style="color:#F57C00">Please enter a tracking number.</div>';
    res.style.background = "#FFF3E0";
    res.classList.remove("hidden");
    return;
  }
  
  try {
    res.innerHTML = 'Loading...';
    res.style.background = "#E3F2FD";
    res.classList.remove("hidden");
    
    const response = await fetch('/api/track', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({trackingNumber})
    });
    
    if (response.ok) {
      const shipment = await response.json();
    res.innerHTML = `
        <div class="flex items-center gap-2 font-medium mb-2">
          <i data-lucide="package" style="width:16px;height:16px;"></i> ${shipment.trackingNumber}
        </div>
        <div class="mb-2">
          <span class="px-2 py-1 rounded-full text-xs font-semibold ${shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' : shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}">
            ${shipment.status}
          </span>
        </div>
        <div class="text-xs mb-2"><i data-lucide="map-pin" style="width:12px;height:12px;"></i> ${shipment.currentLocation || 'Unknown'}</div>
        ${shipment.stages ? `<div class="text-xs space-y-1">
          ${shipment.stages.map(stage => `<div class="flex items-center gap-2 ${stage.status === 'current' ? 'font-medium' : ''}">
            <i data-lucide="${stage.status === 'completed' ? 'check-circle' : stage.status === 'current' ? 'circle' : 'circle'} " style="width:12px;height:12px;color:${stage.status === 'completed' ? '#16a34a' : stage.status === 'current' ? '#f57c00' : '#94a3b8'}"></i>
            ${stage.name} (${stage.date || 'Pending'})
          </div>`).join('')}
        </div>` : ''}
        <div class="mt-3 pt-2 border-t text-xs text-gray-600">
          Est. delivery: ${shipment.estimatedDelivery || 'TBD'}
        </div>
      `;
    } else {
      res.innerHTML = '<div style="color:#F57C00">Shipment not found.</div>';
    }
    lucide.createIcons();
  } catch (error) {
    res.innerHTML = `<div style="color:#F57C00">Error: ${error.message}</div>`;
  }
});

// Contact form - Real API submit
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    name: document.getElementById('fname').value.trim(),
    email: document.getElementById('femail').value.trim(),
    service: document.getElementById('fservice').value,
    message: document.getElementById('fmsg').value.trim()
  };
  const msg = document.getElementById("formMsg");
  
  try {
    msg.textContent = 'Sending...';
    msg.style.background = "#E3F2FD";
    msg.style.color = "#1565C0";
    msg.classList.remove("hidden");
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      msg.style.background = "#E8F5E9";
      msg.style.color = "#2e7d32";
      msg.textContent = "✓ Message sent to database! Check admin panel.";
      e.target.reset();
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    msg.style.background = "#FFF3E0";
    msg.style.color = "#F57C00";
    msg.textContent = `Error: ${error.message}`;
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight + 20 : 100;
    const targetPosition = t.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
      document.getElementById("mobileMenu").classList.add("hidden");
    }
  });
});

lucide.createIcons();
