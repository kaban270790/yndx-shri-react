const express = require("express");
const next = require("next");

const PORT = 3000;

const app = next({
    dev: process.env.NODE_ENV !== "production"
});

const nextExpress = require("next-express/server")(app).injectInto(express);

app.prepare()
    .then(() => {
        const server = nextExpress();
        server.pageRoute({
            path: "/",
            renderPath: "/index",

            async getProps(req, res) {
                return {list: ['item', 'item2']};
            }
        });

        return server.listen(PORT);
    })
    .then(() => console.log(`> Running on http://localhost:${PORT}`))
    .catch(err => {
        console.error(`Server failed to start: ${err.stack}`);
        process.exit(1);
    });
