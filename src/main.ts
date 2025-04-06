import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { Request, Response } from "express";

interface Params {}

type BizhawkRequest = {
  url: string;
  data: Record<any, any>;
};

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: "Bizhawk Compatibility Layer (by Oceanity)",
      description:
        "Registers an endpoint that properly forwards Bizhawk POST requests",
      author: "Oceanity",
      version: "1.0",
      firebotVersion: "5",
    };
  },
  getDefaultParameters: () => ({}),
  run: (runRequest) => {
    const { logger, httpServer } = runRequest.modules;

    httpServer.registerCustomRoute(
      "oceanity",
      "/bizhawk",
      "POST",
      async (req: Request, res: Response) => {
        logger.info(JSON.stringify(req.body));

        try {
          let payload = JSON.parse(req.body.payload) as BizhawkRequest;

          if (!payload.url) {
            throw new Error("Missing required param `url`");
          }

          if (!payload.data) {
            throw new Error("Missing required param `data`");
          }

          const response = await fetch(payload.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload.data),
          });

          if (response.status !== 200) {
            throw new Error(
              `Failed to forward request to ${payload.url}, status: ${response.status}`
            );
          }

          res.status(response.status).send(await response.text());
        } catch (err) {
          logger.error("Error parsing payload", err);
          res.status(400).send(err.message);
          return;
        }
      }
    );
  },
};

export default script;
