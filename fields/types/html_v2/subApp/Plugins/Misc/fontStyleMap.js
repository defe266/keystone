var sizes = {};

for(var i = 9; i < 60; i++){

    sizes['font_size_'+i] = { fontSize: i };
}

export default sizes

/*
export default {
    CODE: { fontFamily: '"Operator Mono", monospace', fontSize: 16 },
    LINEHEIGHT: { lineHeight: 2 },
    FONT_OPERATOR: { fontFamily: 'Operator', fontWeight: 800 },
    FONT_SIZE_9: { fontSize: 9 },
    FONT_SIZE_10: { fontSize: 10 },
    FONT_SIZE_11: { fontSize: 11 },
    FONT_SIZE_12: { fontSize: 12 },
    FONT_SIZE_14: { fontSize: 14 },
    FONT_SIZE_16: { fontSize: 16 },
    FONT_SIZE_18: { fontSize: 18 },
    FONT_SIZE_24: { fontSize: 24 },
    FONT_SIZE_30: { fontSize: 30 },
    FONT_SIZE_36: { fontSize: 36 },
    FONT_SIZE_48: { fontSize: 48 },
    FONT_SIZE_60: { fontSize: 60 },
    FONT_SIZE_72: { fontSize: 72 },
    FONT_SIZE_84: { fontSize: 84 },
    FONT_SIZE_96: { fontSize: 96 },
};
*/