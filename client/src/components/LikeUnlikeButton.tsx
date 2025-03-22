import { Button } from "react-bootstrap";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";

type LikeUnlikeButtonProps = {
  isLiked: boolean;
  handleUpdateFavourites: () => void;
};

function LikeUnlikeButton({
  isLiked,
  handleUpdateFavourites,
}: LikeUnlikeButtonProps) {
  return (
    <Button id="like-button" onClick={handleUpdateFavourites}>
      {isLiked ? (
        <SolidHeart className={"heart-icon"} />
      ) : (
        <OutlineHeart className={"heart-icon"} />
      )}
    </Button>
  );
}

export default LikeUnlikeButton;
