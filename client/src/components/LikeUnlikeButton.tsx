import { Button } from "react-bootstrap";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";

type LikeUnlikeButtonProps = {
  isLiked: boolean;
  onClick: () => void;
};

function LikeUnlikeButton({ isLiked, onClick }: LikeUnlikeButtonProps) {
  return (
    <Button id="like-button" onClick={onClick}>
      {" "}
      {/* <div>
        <SolidHeart className={"heart-icon"} />
        <OutlineHeart className={"heart-icon"} />
      </div> */}
      {isLiked ? (
        <SolidHeart className={"heart-icon"} />
      ) : (
        <OutlineHeart className={"heart-icon"} />
      )}
    </Button>
  );
}

export default LikeUnlikeButton;
