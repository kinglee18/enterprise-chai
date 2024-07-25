import "highlight.js/styles/base16/green-screen.css";
import mermaid from "mermaid";
import {
    Children,
    Fragment,
    createElement,
    isValidElement,
    useEffect,
    useMemo,
} from "react";
import flattenChildren from "react-keyed-flatten-children";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Plugin, unified } from "unified";
import { visit } from "unist-util-visit";


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
                    // eslint-disable-next-line no-undef
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className={ANCHOR_CLASS_NAME}
                        >
                            {children}
                        </a>
                    ),
                    h1: ({ children, id }) => (
                        <h1
                            className="font-sans font-semibold text-2xl  mb-6 mt-6"
                            id={id}
                        >
                            {children}
                        </h1>
                    ),
                    h2: ({ children, id }) => (
                        <h2
                            className="font-sans font-medium text-2xl  mb-6 mt-6"
                            id={id}
                        >
                            {children}
                        </h2>
                    ),
                    h3: ({ children, id }) => (
                        <h3
                            className="font-sans font-semibold text-xl  mb-6 mt-2"
                            id={id}
                        >
                            {children}
                        </h3>
                    ),
                    h4: ({ children, id }) => (
                        <h4
                            className="font-sans font-medium text-xl  my-6"
                            id={id}
                        >
                            {children}
                        </h4>
                    ),
                    h5: ({ children, id }) => (
                        <h5
                            className="font-sans font-semibold text-lg  my-6"
                            id={id}
                        >
                            {children}
                        </h5>
                    ),
                    h6: ({ children, id }) => (
                        <h6
                            className="font-sans font-medium text-lg  my-6"
                            id={id}
                        >
                            {children}
                        </h6>
                    ),
                    p: (props) => {
                        return (
                            <p className="font-sans text-sm  mb-6">
                                {props.children}
                            </p>
                        );
                    },
                    strong: ({ children }) => (
                        <strong className=" font-semibold">
                            {children}
                        </strong>
                    ),
                    em: ({ children }) => (
                        <em>{children}</em>
                    ),
                    pre: ({ children }) => {
                        return (
                            <div className="relative mb-6">
                                <pre className="p-4 rounded-lg border-2   [&>code.hljs]:p-0 [&>code.hljs]:bg-transparent font-code text-sm overflow-x-auto flex items-start">
                                    {children}
                                </pre>
                            </div>
                        );
                    },
                    ul: ({ children }) => (
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
                    ol: ({ children }) => (
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
                    li: ({ children }) => (
                        <div className="font-sans text-sm">{children}</div>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto mb-6">
                            <table className="table-auto border-2 ">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="">{children}</thead>
                    ),
                    th: ({ children }) => (
                        <th className="border-2  p-2 font-sans text-sm font-semibold ">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border-2  p-2 font-sans text-sm ">
                            {children}
                        </td>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4  pl-2  italic">
                            {children}
                        </blockquote>
                    ),
                },
            })
            .processSync(content).result;
    }, [content]);
};
