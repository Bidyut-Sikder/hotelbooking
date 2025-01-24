type Props = {
  selectedPrice?: undefined | number;
  onChange: (value?: number | undefined) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        className="w-full p-2  border-gray-300 border rounded-md"
        value={selectedPrice}
        onChange={(e) =>
          onChange(
            e.target.value
              ? parseInt(e.target.value)
              : (undefined as number | undefined)
          )
        }
        id=""
      >
        <option value="">Select Price</option>
        {[50, 200, 300, 500].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
