import type { NextPage } from "next";
import { signOut } from "next-auth/react";

const CreateProject: NextPage = () => {
    const handleClick = () => {
        signOut({
            redirect: false,
        });
        window.location.href = "https://github.com/maxrpark";
    };
    return (
        <div>
            <h2>it seems you are not the administrator of this site</h2>
            <p>
                If you are interested in create your own about me, click te next
                link
            </p>
            <button onClick={handleClick}>Create Project</button>
        </div>
    );
};

export default CreateProject;
