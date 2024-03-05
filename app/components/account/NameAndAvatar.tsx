import React from "react";

const NameAndAvatar = async ({
  name,
  image,
}: {
  name: string;
  image: string | null;
}) => {
  return (
    <div className="w-[90vw] max-w-[800px] h-24 md:h-32 pl-4 pr-2 mx-auto mt-14 flex justify-between items-center border-b-8 border-main rounded-lg underline-offset-8 bg-secondary">
      <span className="text-2xl font-bold text-right text-primary underline">
        {name}
      </span>
      {image ? (
        <img
          className="w-[20%] min-w-[50px] md:min-w-[60px] min-h-[50px] md:min-h-[60px] max-w-[70px] max-h-[70px] object-cover"
          src={image}
          alt="profile"
        />
      ) : (
        <img
          className="w-[20%] min-w-[60px] min-h-[60px] max-w-[70px] max-h-[70px] object-cover"
          src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Nara&radius=20&backgroundColor=00ADB5&size=90"
          alt="profile"
        />
      )}
    </div>
  );
};

export default NameAndAvatar;
