import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import React from "react";

const PowerBiDemo = () => {
    return (
        <div className="powerbi-container">
            <PowerBIEmbed
                embedConfig={{
                    type: "report", // Supported types: report, dashboard, tile, visual and qna
                    id: "fcefcba9-9b45-4d9e-ac99-ea054b68a516",
                    embedUrl:
                        "https://app.powerbi.com/view?r=eyJrIjoiYTVjOTBlODMtZDA3Ny00ZWQ2LThjZGYtNTY1ZjExMWNkYjU5IiwidCI6ImNlNDVhMjU1LWQ1ZDItNDg0ZC05ZDA3LTQxYTdmYzE5YzhmMCIsImMiOjEwfQ%3D%3D",
                    // accessToken:
                    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2U0NWEyNTUtZDVkMi00ODRkLTlkMDctNDFhN2ZjMTljOGYwLyIsImlhdCI6MTY3NjYwMzAyMSwibmJmIjoxNjc2NjAzMDIxLCJleHAiOjE2NzY2MDg0NjQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFzeitwcHh4YjE0SGV2bm1HdTNKQWcrRGlUNHBaYy9hMm9FaEZjQ1ViRkNCK1M4ZU12cUVjeW5MTTE2RXdnQVh5IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTmfDtCIsImdpdmVuX25hbWUiOiJQaMO6YyIsImlwYWRkciI6IjExMy4xNjEuMjA0LjU0IiwibmFtZSI6IlBow7pjIE5nw7QiLCJvaWQiOiI1ZTM5YjliYS1lMjZlLTRmYjYtYmM5Yi0yYWRiNzM5ZGExY2EiLCJwdWlkIjoiMTAwMzIwMDI3Njc0RTk3NyIsInJoIjoiMC5BVW9BVmFKRnp0TFZUVWlkQjBHbl9Cbkk4QWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0pBRWcuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoid1pEU05XY0xhSThaaUlpVmlSYl9pTjNfa2ZWMTk3dVV4THY2YnRJOHhscyIsInRpZCI6ImNlNDVhMjU1LWQ1ZDItNDg0ZC05ZDA3LTQxYTdmYzE5YzhmMCIsInVuaXF1ZV9uYW1lIjoicGh1Yy5uZ29AQ29ybm1ldC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJwaHVjLm5nb0BDb3JubWV0Lm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6InpzaDRHb05fdGtxMWI5TURwQzA2QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.gqqgSEn2nr8KU2gwelh_TjA4dxNdoHczvec600Aa0DPXt5xZJoDx4z42f2hfaEeP1ALsPBjOz4mwDqvK1KLcwCRFaJZA9EYoz9vFf_k7CKWStX3qUM0JS-3Bd662SPasb8_ODE61n7qe-VeqMJDaZhPMGULmJ5njWZbMmTtLgX7yM6sRbidCWwMLLn0h4P8gCWu4EgzvtG30-Aea7eLPAWbPNwyRwPzvdaKNQ71wrt-FkShXB0hf4qd7lC6IyG4E342RSCc-JXyUsIjTu0ACPSNvFW_Yb7n8aJtKYpwCeyfUZGKbugs5TEQ8JbUQuA2vpUrzFVe6zceFKTB8VtRFCw",
                    tokenType: models.TokenType.Embed,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: false,
                            },
                        },
                        background: models.BackgroundType.Transparent,
                    },
                }}
                eventHandlers={
                    new Map([
                        [
                            "loaded",
                            function () {
                                console.log("Report loaded");
                            },
                        ],
                        [
                            "rendered",
                            function () {
                                console.log("Report rendered");
                            },
                        ],
                        [
                            "error",
                            function (event) {
                                console.log(event);
                            },
                        ],
                    ])
                }
                cssClassName={"report-style-class"}
                getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                }}
            />
        </div>
    );
};

export default PowerBiDemo;
