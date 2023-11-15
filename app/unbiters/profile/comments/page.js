import { Suspense } from "react";
import CommentsContainer from "./CommentContainer";

function Comments() {
    return (
        <>
            <Suspense fallback={<p>Loading feed...</p>}>
                <CommentsContainer />
            </Suspense>
        </>
    );
}

export default Comments;
