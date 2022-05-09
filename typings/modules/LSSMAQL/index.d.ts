export interface TokenRegexes {
    identifier: RegExp;
    getter_dot: RegExp;
    getter_num: RegExp;
    where: RegExp;
    in: RegExp;
    not_in: RegExp;
    and: RegExp;
    or: RegExp;
    greater_equal: RegExp;
    smaller_equal: RegExp;
    equals: RegExp;
    unequal: RegExp;
    greater: RegExp;
    smaller: RegExp;
    paran_open: RegExp;
    paran_close: RegExp;
    string: RegExp;
    number: RegExp;
    boolean: RegExp;
}

export type QueryTokens = keyof TokenRegexes;

export interface Token {
    type: QueryTokens;
    value: string;
}

export interface Condition {
    left: Token[];
    comparison: '!=' | '<' | '<=' | '=' | '>' | '>=' | 'IN' | 'NOT IN';
    right: Token[];
}

export interface ObjectTree {
    type: 'object';
    base: string | 'allianceinfo' | 'buildings' | 'missions' | 'vehicles';
    attributes: (number | string)[];
    filter: (Condition | 'AND' | 'OR')[];
}

export interface FunctionTree {
    type: 'function';
    function: 'len' | 'max' | 'min' | 'sum';
    base: string;
    body: QueryTree | null;
}

export type QueryTree = FunctionTree | ObjectTree;
