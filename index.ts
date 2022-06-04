import axios from "axios";
import * as _ from "lodash";

const owner = "gluesql";
const repo = "gluesql";

const url = `https://api.github.com/repos/${owner}/${repo}/pulls?direction=desc&state=close&per_page=100`;

const main = async () => {
  const { data } = await axios.get<
    {
      html_url: string;
      id: number;
      number: number;
      state: "open" | "closed" | "all";
      locked: boolean;
      title: string;
      user: {
        login: string;
        id: number;
        html_url: string;
        repos_url: string;
        type: string;
        site_admin: boolean;
      };
      body: string;
      labels: {
        id: number;
        name: string;
      }[];
      created_at: Date;
      updated_at: Date;
      closed_at: Date;
      merged_at: Date;
      merge_commit_sha: string;
      assignee: {
        login: string;
        id: number;
        html_url: string;
        type: string;
        site_admin: boolean;
      };
      assignees: {
        login: string;
        id: number;
        html_url: string;
        type: string;
        site_admin: boolean;
      }[];
      requested_reviewers: {
        login: string;
        id: number;
        html_url: string;
        type: string;
        site_admin: boolean;
      }[];
      head: {
        label: string;
        ref: string;
        sha: "6dcb09b5b57875f334f61aebed695e2e4193db5e";
        user: {
          login: string;
          id: number;
          html_url: string;
          type: string;
          site_admin: boolean;
        };
        repo: {
          id: number;
          full_name: string;
          owner: {
            login: string;
            id: number;
            html_url: string;
            type: string;
            site_admin: boolean;
          };
          html_url: string;
          fork: boolean;
        };
      };
    }[]
  >(url);

  const list = data
    .filter((pr) => pr.merged_at !== null)
    .filter((pr) => new Date(pr.merged_at) >= new Date("2022-05-01"))
    .filter((pr) => new Date(pr.merged_at) < new Date("2022-06-01"));

  for (const pullRequest of list) {
    console.log(pullRequest.html_url);
    console.log(pullRequest.head.user.login.replace("gluesql", "panarch"));
    console.log();
  }
  console.log(list.length);
};

main()
  .catch(console.error)
  .finally(() => process.exit());
