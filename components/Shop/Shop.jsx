import ShopAll from "./ShopAll";

export default function Shop() {
  return (
    <>
      <h1 className="text-center">the shop</h1>
      <p className="text-center lg:w-[58%] w-full m-auto lg:-mt-[3.2rem] mt-8">
        Wether you're a budding entrepreneur, or a seasoned pro we've got just what you need.
        With templates and digital assets tailored to <i>elevate</i> your creative process we want to
        make your life <i>easy</i>.<br/>
        <br/>Browse our shop of curated resources, <i>thoughtfully</i> crafted with the enricnhment of your
        business in mind.
      </p>
      <ShopAll />
    </>
  );
}
