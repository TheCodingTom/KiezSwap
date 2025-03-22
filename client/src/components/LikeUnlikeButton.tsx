import { Button } from "react-bootstrap";

type LikeUnlikeButtonProps = {
  isLiked: boolean;
  onClick: () => void;
};

function LikeUnlikeButton({ isLiked, onClick }: LikeUnlikeButtonProps) {
  return <Button onClick={onClick}>{isLiked ? "Unlike" : "Like"}</Button>;
}

export default LikeUnlikeButton;
