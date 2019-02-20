export default {
    {{#result}}
    // ==== {{{name}}} {{{description}}} ==== //
    {{#data}}
    {{operationId}}: `{{{path}}}`, // {{{summary}}}
    {{/data}}

    {{/result}}
}