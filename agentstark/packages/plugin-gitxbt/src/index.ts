import { Plugin } from "@elizaos/core";
import { continueAction } from "./actions/continue.ts";
import { followRoomAction } from "./actions/followRoom.ts";
import { ignoreAction } from "./actions/ignore.ts";
import { muteRoomAction } from "./actions/muteRoom.ts";
import { noneAction } from "./actions/none.ts";
import { unfollowRoomAction } from "./actions/unfollowRoom.ts";
import { unmuteRoomAction } from "./actions/unmuteRoom.ts";
import { factEvaluator } from "./evaluators/fact.ts";
import { goalEvaluator } from "./evaluators/goal.ts";
import { boredomProvider } from "./providers/boredom.ts";
import { factsProvider } from "./providers/facts.ts";
import { timeProvider } from "./providers/time.ts";
import { getContributorsAction } from "./actions/contributor.ts";

export * as actions from "./actions";
export * as evaluators from "./evaluators";
export * as providers from "./providers";

export const gitxbt: Plugin = {
    name: "gitxbt",
    description: "Agent gitxbt gets all information about github repository",
    actions: [
        // continueAction,
        // followRoomAction,
        // unfollowRoomAction,
        // ignoreAction,
        // noneAction,
        // muteRoomAction,
        // unmuteRoomAction,
        getContributorsAction,
    ],
    //  evaluators: [factEvaluator, goalEvaluator],
    //providers: [boredomProvider, timeProvider, factsProvider],
};
