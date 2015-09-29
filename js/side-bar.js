
$('body').scrollspy({
    target: '.bs-docs-sidebar',
});

var shiftWindow = function() { scrollBy(0,0); };
if (location.hash) shiftWindow();
window.addEventListener("hashchange", shiftWindow);

