import { useSelector } from "react-redux";
import "../styles/pages/WishList.css";

const WishListPage = () => {
  const getWishList = useSelector((state) => state.wishList); //store 값
  const wishList = getWishList.filter((item, index, self) => {
    return index === self.findIndex((t) => t.cloth_id === item.cloth_id);
  });

  return (
    <div>
      <div className="wishList-Logo">관심상품</div>
    </div>
  );
};

export default WishListPage;
