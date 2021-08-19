function fromString(string, encoding) {
    var length;
    if (typeof encoding !== "string" || encoding.length === 0) {
        if (string.length === 0) return new FastBuffer();
        encoding = "utf8";
        length = byteLengthUtf8(string);
    } else {
        length = byteLength(string, encoding, true);
        if (length === -1)
            throw new errors.TypeError("ERR_UNKNOWN_ENCODING", encoding);
        if (string.length === 0) return new FastBuffer();
    }

    if (length >= Buffer.poolSize >>> 1)
        return createFromString(string, encoding);

    if (length > poolSize - poolOffset)
        createPool();
    var b = new FastBuffer(allocPool, poolOffset, length);
    const actual = b.write(string, encoding);
    if (actual !== length) {
        b = new FastBuffer(allocPool, poolOffset, actual);
    }
    poolOffset += actual;
    alignPool();
    return b;
}