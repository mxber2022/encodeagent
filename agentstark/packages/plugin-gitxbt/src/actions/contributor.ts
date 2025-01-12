import { ModelClass } from "@elizaos/core";
import {
    ActionExample,
    IAgentRuntime,
    Memory,
    State,
    HandlerCallback,
    type Action,
    generateText,
} from "@elizaos/core";

export const getContributorsAction: Action = {
    name: "GET_CONTRIBUTORS",
    similes: [
        "FETCH_CONTRIBUTORS",
        "LIST_CONTRIBUTORS",
        "SHOW_CONTRIBUTORS",
        "CONTRIBUTORS",
        "GET_REPO_CONTRIBUTORS",
        "CHECK_CONTRIBUTORS",
    ],
    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        // Check if message contains repository owner and name
        const hasRepoInfo = message.content.text.includes("/");
        return hasRepoInfo;
    },
    description:
        "Fetch and display all contributors for a specified GitHub repository.",
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        _callback: HandlerCallback
    ): Promise<boolean> => {
        try {
            // Extract owner and repo from message

            const context = `Extract the github link from the user message. The message is:
            ${_message.content.text}`;

            const isResponse = await generateText({
                runtime: _runtime,
                context,
                modelClass: ModelClass.SMALL,
                stop: ["\n"],
            });

            let repo: string;
            let owner: string;

            if (isResponse && isResponse.includes("/")) {
                const parts = isResponse.split("/");
                repo = parts.pop(); // The last part is the repo
                owner = parts.pop(); // The second last part is the owner
                console.log("Owner:", owner);
                console.log("Repo:", repo);
            } else {
                console.error("Invalid format for isResponse:", isResponse);
            }

            console.log("owner: ", owner);
            console.log("repo: ", repo);
            // const owner: string = "elizaOS";
            //const repo: string = "eliza";

            // Call the API endpoint
            const response = await fetch(
                `http://localhost:3003/api/repo/${owner}/${repo}/contributors`
            );
            console.log("response:", response);
            const text = await response.text();
            const result = JSON.parse(text);
            const contributors = result.data;
            //console.log("contributors: ", contributors);
            // const contributors = await response.json();

            const logins = contributors.map(
                (contributor: any) => contributor.login
            );
            console.log("Logins:", logins);

            // Process and display contributors
            _callback({
                text: `Found ${contributors.length} contributors for ${owner}/${repo}, ${logins}`,
                contributors: logins,
            });

            return true;
        } catch (error) {
            _callback({
                text: "Failed to fetch repository contributors. Please check the repository name and try again.",
                error: error,
            });
            return false;
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "who contributed to facebook/react" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "analyzing contributor data for facebook/react",
                    action: "GET_CONTRIBUTORS",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "show me the contributors for vercel/next.js",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "fetching contributor information for vercel/next.js",
                    action: "GET_CONTRIBUTORS",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "get contributors list for tensorflow/tensorflow",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "retrieving contributor data for tensorflow/tensorflow",
                    action: "GET_CONTRIBUTORS",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "who's working on microsoft/vscode",
                    action: "GET_CONTRIBUTORS",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "analyzing contributor patterns for microsoft/vscode",
                    action: "GET_CONTRIBUTORS",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "check contributors for angular/angular",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "pulling up contributor stats for angular/angular",
                    action: "GET_CONTRIBUTORS",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
