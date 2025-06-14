console.log(`main.js loaded`);

document.querySelectorAll("img.import-img[data-src]").forEach((img) => {
    const path = img.dataset.src;
    import(path)
        .then((module) => {
            img.src = module.default || module;
        })
        .catch((err) => {
            console.error(`Error, could not load img: ${path}`, err);
        });
});
