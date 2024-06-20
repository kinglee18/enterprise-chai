import { CircleNotch } from "@phosphor-icons/react";
import "highlight.js/styles/base16/green-screen.css";
import mermaid from "mermaid";
import Link from "next/link";
import {
    Children,
    Fragment,
    createElement,
    isValidElement,
    useEffect,
    useMemo,
    useState,
} from "react";
import flattenChildren from "react-keyed-flatten-children";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Plugin, unified } from "unified";
import { visit } from "unist-util-visit";
// @ts-expect-error
import { HtmlGenerator, parse } from "latex.js";


export const ANCHOR_CLASS_NAME =
    "font-semibold underline  underline-offset-[2px] decoration-1  transition-colors";

// Mixing arbitrary Markdown + Capsize leads to lots of challenges
// with paragraphs and list items. This replaces paragraphs inside
// list items into divs to avoid nesting Capsize.
const rehypeListItemParagraphToDiv: Plugin<[], any> = () => {
    return (tree) => {
        visit(tree, "element", (element) => {
            if (element.tagName === "li") {
                element.children = element.children.map((child) => {
                    if (child.type === "element" && child.tagName === "p") {
                        child.tagName = "div";
                    }
                    return child;
                });
            }
        });
        return tree;
    };
};

export const useMarkdownProcessor = (content: string) => {
    debugger
    useEffect(() => {
        mermaid.initialize({ startOnLoad: false, theme: "forest" });
    }, []);

    return useMemo(() => {

        return unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeHighlight, { ignoreMissing: true })
            .use(rehypeListItemParagraphToDiv)
            .use(rehypeReact, {
                createElement,
                Fragment,
                components: {
                    a: ({ href, children }: JSX.IntrinsicElements["a"]) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className={ANCHOR_CLASS_NAME}
                        >
                            {children}
                        </a>
                    ),
                    h1: ({ children, id }: JSX.IntrinsicElements["h1"]) => (
                        <h1
                            className="font-sans font-semibold text-2xl  mb-6 mt-6"
                            id={id}
                        >
                            {children}
                        </h1>
                    ),
                    h2: ({ children, id }: JSX.IntrinsicElements["h2"]) => (
                        <h2
                            className="font-sans font-medium text-2xl  mb-6 mt-6"
                            id={id}
                        >
                            {children}
                        </h2>
                    ),
                    h3: ({ children, id }: JSX.IntrinsicElements["h3"]) => (
                        <h3
                            className="font-sans font-semibold text-xl  mb-6 mt-2"
                            id={id}
                        >
                            {children}
                        </h3>
                    ),
                    h4: ({ children, id }: JSX.IntrinsicElements["h4"]) => (
                        <h4
                            className="font-sans font-medium text-xl  my-6"
                            id={id}
                        >
                            {children}
                        </h4>
                    ),
                    h5: ({ children, id }: JSX.IntrinsicElements["h5"]) => (
                        <h5
                            className="font-sans font-semibold text-lg  my-6"
                            id={id}
                        >
                            {children}
                        </h5>
                    ),
                    h6: ({ children, id }: JSX.IntrinsicElements["h6"]) => (
                        <h6
                            className="font-sans font-medium text-lg  my-6"
                            id={id}
                        >
                            {children}
                        </h6>
                    ),
                    p: (props: JSX.IntrinsicElements["p"]) => {
                        return (
                            <p className="font-sans text-sm  mb-6">
                                {props.children}
                            </p>
                        );
                    },
                    strong: ({ children }: JSX.IntrinsicElements["strong"]) => (
                        <strong className=" font-semibold">
                            {children}
                        </strong>
                    ),
                    em: ({ children }: JSX.IntrinsicElements["em"]) => (
                        <em>{children}</em>
                    ),
                    pre: ({ children }: JSX.IntrinsicElements["pre"]) => {
                        return (
                            <div className="relative mb-6">
                                <pre className="p-4 rounded-lg border-2   [&>code.hljs]:p-0 [&>code.hljs]:bg-transparent font-code text-sm overflow-x-auto flex items-start">
                                    {children}
                                </pre>
                            </div>
                        );
                    },
                    ul: ({ children }: JSX.IntrinsicElements["ul"]) => (
                        <ul className="flex flex-col gap-3  my-6 pl-3 [&_ol]:my-3 [&_ul]:my-3">
                            {Children.map(
                                flattenChildren(children).filter(isValidElement),
                                (child, index) => (
                                    <li key={index} className="flex gap-2 items-start">
                                        <div className="w-1 h-1 rounded-full bg-current block shrink-0 mt-1" />
                                        {child}
                                    </li>
                                )
                            )}
                        </ul>
                    ),
                    ol: ({ children }: JSX.IntrinsicElements["ol"]) => (
                        <ol className="flex flex-col gap-3  my-6 pl-3 [&_ol]:my-3 [&_ul]:my-3">
                            {Children.map(
                                flattenChildren(children).filter(isValidElement),
                                (child, index) => (
                                    <li key={index} className="flex gap-2 items-start">
                                        <div
                                            className="font-sans text-sm  font-semibold shrink-0 min-w-[1.4ch]"
                                            aria-hidden
                                        >
                                            {index + 1}.
                                        </div>
                                        {child}
                                    </li>
                                )
                            )}
                        </ol>
                    ),
                    li: ({ children }: JSX.IntrinsicElements["li"]) => (
                        <div className="font-sans text-sm">{children}</div>
                    ),
                    table: ({ children }: JSX.IntrinsicElements["table"]) => (
                        <div className="overflow-x-auto mb-6">
                            <table className="table-auto border-2 ">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }: JSX.IntrinsicElements["thead"]) => (
                        <thead className="">{children}</thead>
                    ),
                    th: ({ children }: JSX.IntrinsicElements["th"]) => (
                        <th className="border-2  p-2 font-sans text-sm font-semibold ">
                            {children}
                        </th>
                    ),
                    td: ({ children }: JSX.IntrinsicElements["td"]) => (
                        <td className="border-2  p-2 font-sans text-sm ">
                            {children}
                        </td>
                    ),
                    blockquote: ({ children }: JSX.IntrinsicElements["blockquote"]) => (
                        <blockquote className="border-l-4  pl-2  italic">
                            {children}
                        </blockquote>
                    ),
                },
            })
            .processSync(content).result;
    }, [content]);
};


const Latex = ({ content }: { content: string }) => {
    const [diagram, setDiagram] = useState<string | boolean>(true);

    useEffect(() => {
        try {
            const generator = new HtmlGenerator({ hyphenate: false });
            const fragment = parse(content, { generator: generator }).domFragment();
            setDiagram(fragment.firstElementChild.outerHTML);
        } catch (error) {
            console.error(error);
            setDiagram(false);
        }
    }, [content]);

    if (diagram === true) {
        return (
            <div className="flex gap-2 items-center">
                <CircleNotch className="animate-spin w-4 h-4 " />
                <p className="font-sans text-sm text-slate-700">Rendering diagram...</p>
            </div>
        );
    } else if (diagram === false) {
        return (
            <p className="font-sans text-sm text-slate-700">
                Unable to render this diagram.
            </p>
        );
    } else {
        return <div dangerouslySetInnerHTML={{ __html: diagram ?? "" }} />;
    }
};

const Mermaid = ({ content }: { content: string }) => {
    const [diagram, setDiagram] = useState<string | boolean>(true);

    useEffect(() => {
        const render = async () => {
            // Generate a random ID for mermaid to use.
            const id = `mermaid-svg-${Math.round(Math.random() * 10000000)}`;

            // Confirm the diagram is valid before rendering.
            if (await mermaid.parse(content, { suppressErrors: true })) {
                const { svg } = await mermaid.render(id, content);
                setDiagram(svg);
            } else {
                setDiagram(false);
            }
        };
        render();
    }, [content]);

    if (diagram === true) {
        return (
            <div className="flex gap-2 items-center">
                <CircleNotch className="animate-spin w-4 h-4 " />
                <p className="font-sans text-sm text-slate-700">Rendering diagram...</p>
            </div>
        );
    } else if (diagram === false) {
        return (
            <p className="font-sans text-sm text-slate-700">
                Unable to render this diagram. Try copying it into the{" "}
                <Link
                    href="https://mermaid.live/edit"
                    className={ANCHOR_CLASS_NAME}
                    target="_blank"
                >
            Mermaid Live Editor
                </Link>
            .
            </p>
        );
    } else {
        return <div dangerouslySetInnerHTML={{ __html: diagram ?? "" }} />;
    }
};

export const MARKDOWN_TEST_MESSAGE = `
# Heading level 1

This is the first paragraph.

This is the second paragraph.

This is the third paragraph.

## Heading level 2

This is an [anchor](https://github.com).

### Heading level 3

This is **bold** and _italics_.

#### Heading level 4

This is \`inline\` code.

This is a code block:

\`\`\`tsx
const Message = () => {
  return <div>hi</div>;
};
\`\`\`

##### Heading level 5

This is an unordered list:

- One
- Two
- Three, and **bold**

This is an ordered list:

1. One
1. Two
1. Three

This is a complex list:

1. **Bold**: One
    - One
    - Two
    - Three
  
2. **Bold**: Three
    - One
    - Two
    - Three
  
3. **Bold**: Four
    - One
    - Two
    - Three

###### Heading level 6

> This is a blockquote.

This is a table:

| Vegetable | Description |
|-----------|-------------|
| Carrot    | A crunchy, orange root vegetable that is rich in vitamins and minerals. It is commonly used in soups, salads, and as a snack. |
| Broccoli  | A green vegetable with tightly packed florets that is high in fiber, vitamins, and antioxidants. It can be steamed, boiled, stir-fried, or roasted. |
| Spinach   | A leafy green vegetable that is dense in nutrients like iron, calcium, and vitamins. It can be eaten raw in salads or cooked in various dishes. |
| Bell Pepper | A colorful, sweet vegetable available in different colors such as red, yellow, and green. It is often used in stir-fries, salads, or stuffed recipes. |
| Tomato    | A juicy fruit often used as a vegetable in culinary preparations. It comes in various shapes, sizes, and colors and is used in salads, sauces, and sandwiches. |
| Cucumber   | A cool and refreshing vegetable with a high water content. It is commonly used in salads, sandwiches, or as a crunchy snack. |
| Zucchini | A summer squash with a mild flavor and tender texture. It can be sautéed, grilled, roasted, or used in baking recipes. |
| Cauliflower | A versatile vegetable that can be roasted, steamed, mashed, or used to make gluten-free alternatives like cauliflower rice or pizza crust. |
| Green Beans | Long, slender pods that are low in calories and rich in vitamins. They can be steamed, stir-fried, or used in casseroles and salads. |
| Potato | A starchy vegetable available in various varieties. It can be boiled, baked, mashed, or used in soups, fries, and many other dishes. |

This is a mermaid diagram:

\`\`\`mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit
\`\`\`

\`\`\`latex
\\[F(x) = \\int_{a}^{b} f(x) \\, dx\\]
\`\`\`
`;

import X from "@phosphor-icons/react/dist/icons/X";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface Props {
    open: boolean;
    setOpen(open: boolean): void;
    title: string;
    description?: ReactNode;
    children: ReactNode;
    size?: "xl" | "3xl";
}

export const Dialog = ({
    open,
    setOpen,
    title,
    description,
    children,
    size = "xl",
}: Props) => {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 py-8 bg-slate-900/90 grid place-items-center overflow-y-auto z-50">
                    <DialogPrimitive.Content
                        className={`bg-white rounded-lg shadow-2xl p-8 w-[90vw] relative ${
                            size === "3xl" ? "max-w-3xl" : "max-w-xl"
                        }`}
                    >
                        <DialogPrimitive.Title className="font-sans text-lg font-semibold mb-4">
                            {title}
                        </DialogPrimitive.Title>
                        {description ? (
                            <DialogPrimitive.Description className="font-sans text-sm mb-8">
                                {description}
                            </DialogPrimitive.Description>
                        ) : null}
                        {children}
                        <DialogPrimitive.Close asChild>
                            <button
                                className="absolute top-6 right-6 p-2 rounded-full  transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-4 h-4 text-slate-700" />
                            </button>
                        </DialogPrimitive.Close>
                    </DialogPrimitive.Content>
                </DialogPrimitive.Overlay>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
};
