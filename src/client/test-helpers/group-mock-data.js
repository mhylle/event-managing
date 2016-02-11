/* jshint -W079, -W101 */
var groupMockData = (function () {
    var mockUsers = getMockUsers();

    return {
        getMockGroups: getMockGroups,
        getMockUsers: getMockUsers,
        getMockGroupWithUsers: getMockGroupWithUsers,
        getFailedMockGroups: getFailedMockGroups,
        getCrashedMockGroups: getCrashedMockGroups,
        getMockGroupWithoutUsersArray: getMockGroupWithoutUsersArray,
        getMockGroupWithUsersWithoutData: getMockGroupWithUsersWithoutData,
        getMockGroupWithUsersWithoutUsersAdded: getMockGroupWithUsersWithoutUsersAdded,
        getMockGroupWithUsersWithUsersAdded: getMockGroupWithUsersWithUsersAdded
    };

    function getMockUsers() {
        return [
            {
                id: 1,
                gender: 'Male',
                firstname: 'Brandon',
                lastname: 'Morales',
                username: 'bmorales0',
                email: 'bmorales0@e-recht24.de',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '381-(499)311-9438',
                logicalid: '51ef4033-990c-4ecf-8e50-34adfd464f5e'
            },
            {
                id: 2,
                gender: 'Male',
                firstname: 'Martin',
                lastname: 'King',
                username: 'mking1',
                email: 'mking1@prnewswire.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '351-(660)862-6546',
                logicalid: '7660ea97-d791-434e-8e71-7ce2ee672b9f'
            },
            {
                id: 3,
                gender: 'Male',
                firstname: 'Patrick',
                lastname: 'Patterson',
                username: 'ppatterson2',
                email: 'ppatterson2@statcounter.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '420-(863)322-2551',
                logicalid: 'ff6ac4e4-cc70-4891-a0da-914768fe21b0'
            },
            {
                id: 4,
                gender: 'Female',
                firstname: 'Susan',
                lastname: 'Jordan',
                username: 'sjordan3',
                email: 'sjordan3@paypal.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '7-(329)184-8731',
                logicalid: '19924d23-6a5d-481d-b200-d49a84dfddde'
            }
        ];
    }

    function getMockGroups() {
        // jscs:disable
        return [
            {
                'internalId': {
                    '$oid': '56b310804d6f637a00020b00'
                },
                'id': 1,
                'name': 'cum sociis',
                'type': 'public',
                'logo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC'
            },
            {
                'internalId': {
                    '$oid': '56b310804d6f637a00030b00'
                },
                'id': 2,
                'name': 'ac',
                'type': 'private',
                'logo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALeSURBVDjLjZNLTxNRGIb5A2Xh0rULjJqw1BCDprXQAuICDBEBE7xFJQY1giCKEARCF9rUljuEFiOIBokFhYIFK6Q2Ei6V3oW21BKFdnq/93VmQomACyd5M+d8Oc9zvjM5kwQg6e/Mzs6myeVywcTExLxUKv09PDzsHBwc1EkkElG/WHRq7/qdgUqlYpCwkITDFosFDocDbrcbPp8PLpcLGs0KRC8aIm3CerGA35S8S7ANfzCZTIjH4wgEAqAkZrMZm5ubiEajiEf9iPh1kMteoqW54nNTY03yjoDamYLD4TCoJxKJgJobjUYQBEFLQ/6fCHpXEAsaMD7ai7rHZWJaQMLHybZjXq+XBjweDy2x2WzQarWg6tFoBD6XFiGvhu4iTOZO+fXYvbs305JIWGi1WkFFp9PREHVmSmS32+lxKOgiBWq4Vgeg7S+A4V0DFrrY6HzEmUxKTU3F/+T2pSOwT1WAWHoPeGxwLg3hUzM3QgvUajX0ej0UCgX6+vpogHqvr6/T9bFXFfi1+BAh6wjs8hb4l98iuqYgu7gapwXUogRESahQNSql54/Boa5BzK+A33QLW1/LoBGXYqn3Gi4X5RP7BFQSsGG+H47lB4gF5uAzliBgKYR7pQqmnlxMymXIzM1b2XeEhKg4OwV2VcU2XIyA+QJc6mroW7lQqRTofD2KzOzcjn9+xItZh7EkLSfbnkFgtRRBSxEIshODiIMZpRLfzE6kn+HGWOyME/RF4vP5wunpaWwQVkxLefg+WoXFsWdYV+bDt1qIrYVK6NvP4odaCfPGJhoFXWBmcDt2biKPx2PUP62TDYxIMNjMBNxr0LbnYarqIL60kru2MKFZ+Ain04nu7m4wWezx9PR0xq6fqba2llFZfb+j/spRhOYECCmfQ9lwGkM3DmFmSgzJmx5wuJwwi8USJuBdgkTyTx4INZakxGRNnLjkCTtSXJBJ5JzLUmflcNpIOG3v+j9k/eSwcE1V7wAAAABJRU5ErkJggg=='
            },
            {
                'internalId': {
                    '$oid': '56b310804d6f637a00040b00'
                },
                'id': 3,
                'name': 'velit',
                'logo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJRSURBVDjL3VNNaJIBGBaCDnXqVlEQO0ixrE1a26G2uYU0tyVaA2lsHtS5HzuYhTkl0CHZmpT/0coO0UVS6AdrkCPFkC0am+ambea2GjOYuubmN9vG0/eNLl1s0K0XHnh53h8eXp6XBoD2L6D9Jwuqq6v3dnd3X9fr9Rmn0wmNRjMnk8kqSewn8wTFUTWqh+r9YwGTydzd1NTUbzKZkEqlkEgk4Pf7odVqv6jV6kA8Hl+nuGAwCNfgVcSeCjD9XI/xR2xM2ErbaeXl5RcUCsVyNBrNCAQCb2Nj46ZEIoHZbIZKpQKVU5xVWzu+OKzEcvgVkFtANvwMoYHzKUpBv06nIywWi5TL5e6pqanJ+Xw+jI2NIRAIwO12Q9lZQWSiNwuFry+w+O4O8hEPNmeDiDzuIGgMBqNLKpVm7Xb7NT6fP8RisX6y2WzweLxtKDrOIB3RYCsfRD4hQ3r0CqaeiBAebFsaNfPotGNkNDc3TxmNxqzL5Up7PB44HA7I5XLYDEJkIipsESGszQhBzLdiZbIXM47apY/Gc2XbR6TT6btI2WUcDicpFotXe3p6CBKFu3KmdfGD8vdwO4i5y/jxSY1pa91qxFBxuqgPvH0HLk6+URS28gEQSRHW59uwTCqZttXnYwNVR4oa6WHXYVHU24uJ1/fwbaQFa8lWpMdv4LOV9T1mrCr5qxNdt+uBlVnEHlzCcO9BvL/fAL/u1ELYUHl8R1buk5RuFEJWFEZMGNGz4BIfyg2pTpzc8S+0nN1H3BIe3fAZGjbeGuv8L5WMkmK/8AtkdLda3u0iOQAAAABJRU5ErkJggg=='
            }
        ];
        // jscs:enable
    }

    function getMockGroupWithoutUsersArray() {
        // jscs:disable
        return {
            internalId: {
                $oid: '56b310804d6f637a00020b00'
            },
            id: 1,
            name: 'cum sociis',
            type: 'public',
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC'
        };
    }

    function getMockGroupWithUsersWithoutData() {
        // jscs:disable
        return [
            {
                internalId: {
                    $oid: '56b310804d6f637a00020b00'
                },
                id: 1,
                name: 'cum sociis',
                type: 'public',
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC',
                users: [],
            }
        ];
    }

    function getMockGroupWithUsersWithoutUsersAdded() {
        // jscs:disable
        return {
            internalId: {
                $oid: '56b310804d6f637a00020b00'
            },
            id: 1,
            name: 'cum sociis',
            type: 'public',
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC',
            users: [mockUsers[0], mockUsers[1]],
        };
    }

    function getMockGroupWithUsersWithUsersAdded() {
        // jscs:disable
        return {
            internalId: {
                $oid: '56b310804d6f637a00020b00'
            },
            id: 1,
            name: 'cum sociis',
            type: 'public',
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC',
            users: [mockUsers[0], mockUsers[1], mockUsers[2]],
        };
    }

    function getMockGroupWithUsers() {
        // jscs:disable
        return [
            {
                internalId: {
                    $oid: '56b310804d6f637a00020b00'
                },
                id: 1,
                name: 'cum sociis',
                type: 'public',
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC',
                users: [mockUsers[0], mockUsers[1], mockUsers[2]],
            },
            {
                internalId: {
                    $oid: '56b310804d6f637a00030b00'
                },
                id: 2,
                name: 'ac',
                type: 'private',
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALeSURBVDjLjZNLTxNRGIb5A2Xh0rULjJqw1BCDprXQAuICDBEBE7xFJQY1giCKEARCF9rUljuEFiOIBokFhYIFK6Q2Ei6V3oW21BKFdnq/93VmQomACyd5M+d8Oc9zvjM5kwQg6e/Mzs6myeVywcTExLxUKv09PDzsHBwc1EkkElG/WHRq7/qdgUqlYpCwkITDFosFDocDbrcbPp8PLpcLGs0KRC8aIm3CerGA35S8S7ANfzCZTIjH4wgEAqAkZrMZm5ubiEajiEf9iPh1kMteoqW54nNTY03yjoDamYLD4TCoJxKJgJobjUYQBEFLQ/6fCHpXEAsaMD7ai7rHZWJaQMLHybZjXq+XBjweDy2x2WzQarWg6tFoBD6XFiGvhu4iTOZO+fXYvbs305JIWGi1WkFFp9PREHVmSmS32+lxKOgiBWq4Vgeg7S+A4V0DFrrY6HzEmUxKTU3F/+T2pSOwT1WAWHoPeGxwLg3hUzM3QgvUajX0ej0UCgX6+vpogHqvr6/T9bFXFfi1+BAh6wjs8hb4l98iuqYgu7gapwXUogRESahQNSql54/Boa5BzK+A33QLW1/LoBGXYqn3Gi4X5RP7BFQSsGG+H47lB4gF5uAzliBgKYR7pQqmnlxMymXIzM1b2XeEhKg4OwV2VcU2XIyA+QJc6mroW7lQqRTofD2KzOzcjn9+xItZh7EkLSfbnkFgtRRBSxEIshODiIMZpRLfzE6kn+HGWOyME/RF4vP5wunpaWwQVkxLefg+WoXFsWdYV+bDt1qIrYVK6NvP4odaCfPGJhoFXWBmcDt2biKPx2PUP62TDYxIMNjMBNxr0LbnYarqIL60kru2MKFZ+Ain04nu7m4wWezx9PR0xq6fqba2llFZfb+j/spRhOYECCmfQ9lwGkM3DmFmSgzJmx5wuJwwi8USJuBdgkTyTx4INZakxGRNnLjkCTtSXJBJ5JzLUmflcNpIOG3v+j9k/eSwcE1V7wAAAABJRU5ErkJggg==',
                users: []
            }
        ];
        // jscs:enable
    }

    function getFailedMockGroups() {
        return {
            status: 'RESPONSE_ERROR',
            message: 'Unable to retrieve data from database'
        };
    }

    function getCrashedMockGroups() {
        return {};
    }
})();
