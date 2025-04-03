
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ItemDetails } from './SellPageContent';

interface ItemDetailsFormProps {
  details: ItemDetails;
  onChange: (details: Partial<ItemDetails>) => void;
}

const ItemDetailsForm = ({ details, onChange }: ItemDetailsFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSelectChange = (name: keyof ItemDetails, value: string) => {
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-6">
      {/* Brand */}
      <div className="space-y-2">
        <Label htmlFor="brand">Brand *</Label>
        <Input
          id="brand"
          name="brand"
          value={details.brand}
          onChange={handleInputChange}
          placeholder="e.g., Nike, Zara, H&M"
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select 
          value={details.category} 
          onValueChange={(value) => handleSelectChange('category', value)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tops">Tops</SelectItem>
            <SelectItem value="bottoms">Bottoms</SelectItem>
            <SelectItem value="dresses">Dresses</SelectItem>
            <SelectItem value="outerwear">Outerwear</SelectItem>
            <SelectItem value="shoes">Shoes</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Size */}
      <div className="space-y-2">
        <Label htmlFor="size">Size *</Label>
        <Input
          id="size"
          name="size"
          value={details.size}
          onChange={handleInputChange}
          placeholder="e.g., S, M, L, 10, 42"
          required
        />
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <Label>Condition *</Label>
        <RadioGroup 
          value={details.condition} 
          onValueChange={(value) => handleSelectChange('condition', value)}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new" />
            <Label htmlFor="new" className="cursor-pointer">New with tags</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="like_new" id="like_new" />
            <Label htmlFor="like_new" className="cursor-pointer">Like new</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="good" id="good" />
            <Label htmlFor="good" className="cursor-pointer">Good</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fair" id="fair" />
            <Label htmlFor="fair" className="cursor-pointer">Fair</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Color */}
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          name="color"
          value={details.color}
          onChange={handleInputChange}
          placeholder="e.g., Black, Red, Navy Blue"
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price">Expected Price ($) *</Label>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          value={details.price}
          onChange={handleInputChange}
          placeholder="Enter your asking price"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={details.description}
          onChange={handleInputChange}
          placeholder="Provide additional details about your item"
          rows={4}
        />
      </div>

      <p className="text-xs text-gray-500">* Required fields</p>
    </div>
  );
};

export default ItemDetailsForm;
