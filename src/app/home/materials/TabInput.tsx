import {Input} from "@nextui-org/input";
import {Chip} from "@nextui-org/chip";
import {useRef, useState} from "react";

interface TagInputProps {
    tags: string[];
    setTags:  void;
}
export const TagInput = (
    {
        tags,
        setTags
    }: TagInputProps

) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.endsWith(' ') && value.trim() !== '' && tags.length < 5) {
            const newTag = value.trim();
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            const lastTag = tags[tags.length - 1];
            removeTag(lastTag);
        }
    };

    return (
        <div className="w-full items-center">
            <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                    if (inputValue.trim() !== '' && tags.length < 5) {
                        setTags([...tags, inputValue.trim()]);
                        setInputValue('');}
                }
                }
                placeholder={tags.length === 0 ? "Type and press space to add tags (max 5)" : ""}
                disabled={tags.length >= 5}
                startContent={
                    <div className="flex flex-nowrap gap-1 max-w-[calc(100%-24px)]">
                        {tags.map((tag, index) => (
                            <Chip
                                key={index}
                                onClose={() => removeTag(tag)}
                                size="sm"
                                className="flex-shrink-0 rounded bg-violet-100 shadow-md"
                            >
                                {tag}
                            </Chip>
                        ))}
                    </div>
                }
                classNames={{
                    input: "ml-1 w-full hover:bg-transparent",
                    inputWrapper: "h-auto min-h-[48px] items-center py-1 px-2 bg-transparent border border-gray-400 rounded h-[59px]  hover:bg-transparent",
                    innerWrapper: "bg-transparent  ",
                    input: "bg-transparent",
                }}
            />
        </div>
    );
};
