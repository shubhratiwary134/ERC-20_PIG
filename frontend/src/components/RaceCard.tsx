import { Pigs } from "../data/pigData";

const RaceCard = () => {
  const handleClick = (pig) => {
    console.log("Selected Pig:", pig.name);
  };
  return (
    <div className="mt-10 text-white flex flex-col p-10">
      <h1 className="text-2xl">
        Pick your pig - Choose wisely this might be the toughest decision you
        make
      </h1>
      <div className="mt-10 flex gap-20">
        {Pigs.map((pig, index) => (
          <div
            key={index}
            onClick={() => handleClick(pig)}
            className="flex flex-col gap-5 items-center w-64 h-88 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-white transition-all duration-300  hover:scale-110 hover:bg-white/20 hover:border-white/40"
          >
            <img src={pig.imageUrl} className="h-1/2 " />
            <p>{pig.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceCard;
