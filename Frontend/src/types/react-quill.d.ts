declare module 'react-quill' {
    import * as React from 'react';

    export interface QuillOptions {
        theme?: string;
        modules?: any;
        formats?: string[];
        bounds?: string | HTMLElement;
        placeholder?: string;
        preserveWhitespace?: boolean;
        readOnly?: boolean;
    }

    export interface ReactQuillProps extends QuillOptions {
        value?: string;
        defaultValue?: string;
        onChange?: (content: string, delta: any, source: string, editor: any) => void;
        onChangeSelection?: (selection: any, source: string, editor: any) => void;
        onFocus?: (selection: any, source: string, editor: any) => void;
        onBlur?: (previousSelection: any, source: string, editor: any) => void;
        onKeyDown?: React.KeyboardEventHandler<any>;
        onKeyPress?: React.KeyboardEventHandler<any>;
        onKeyUp?: React.KeyboardEventHandler<any>;
        style?: React.CSSProperties;
        className?: string;
        id?: string;
    }

    export default class ReactQuill extends React.Component<ReactQuillProps> {
        getEditor(): any;
    }
}
