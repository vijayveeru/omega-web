window.toggleMenu = function() {
    const menu = document.getElementById('menu');
    if (menu) menu.classList.toggle('show');
};

async function fetchStatusData() {
    const btn = document.getElementById('refresh-icon');
    if (btn) btn.classList.add('spinning'); // Start spin animation

    try {
        const res = await fetch('data/status.json');
        const data = await res.json();
        
        // Update basic info
        if(document.getElementById('pubg-v')) document.getElementById('pubg-v').innerText = data.pubg_version;
        if(document.getElementById('bgmi-v')) document.getElementById('bgmi-v').innerText = data.bgmi_version;
        if(document.getElementById('server-status')) document.getElementById('server-status').innerText = data.status;
        if(document.getElementById('update-time')) document.getElementById('update-time').innerText = data.last_updated;
        
        // Update metrics
        if(document.getElementById('lat-val')) document.getElementById('lat-val').innerText = data.latency;
        if(document.getElementById('sec-val')) document.getElementById('sec-val').innerText = data.security;
        if(document.getElementById('node-val')) document.getElementById('node-val').innerText = data.nodes;

    } catch (err) {
        if(document.getElementById('server-status')) document.getElementById('server-status').innerText = "OFFLINE";
    } finally {
        // Stop spin animation after a slight delay for effect
        setTimeout(() => { if (btn) btn.classList.remove('spinning'); }, 800);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchStatusData(); // Initial Load

    // ARROW VISIBILITY LOGIC
    const mainContainer = document.querySelector('main');
    const arrow = document.getElementById('bottom-arrow');
    if (mainContainer && arrow) {
        const checkScroll = () => {
            const isScrollable = mainContainer.scrollHeight > mainContainer.clientHeight + 10;
            const isAtBottom = mainContainer.scrollTop + mainContainer.clientHeight >= mainContainer.scrollHeight - 50;
            if (!isScrollable || isAtBottom) arrow.classList.add('hidden');
            else arrow.classList.remove('hidden');
        };
        mainContainer.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        setTimeout(checkScroll, 500); // Check after content loads
    }
});
