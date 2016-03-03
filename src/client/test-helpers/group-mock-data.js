/* jshint -W079, -W101 */
var groupMockData = (function () {
    var mockUsers = getMockUsers();

    return {
        getMockGroups: getMockGroups,
        getMockUsers: getMockUsers,
        getMockGroupWithUsers: getMockGroupWithUsers,
        getFailedMockGroups: getFailedMockGroups,
        getCrashedMockGroups: getCrashedMockGroups,
        getMockEmptyGroups: getMockEmptyGroups,
        getMockGroupWithoutUsersArray: getMockGroupWithoutUsersArray,
        getMockGroupWithUsersWithoutData: getMockGroupWithUsersWithoutData,
        getMockGroupWithUsersWithoutUsersAdded: getMockGroupWithUsersWithoutUsersAdded,
        getMockGroupWithUsersWithUsersAdded: getMockGroupWithUsersWithUsersAdded,
        getMockGroupWithAllUsersAdded: getMockGroupWithAllUsersAdded
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
            },
            {
                id: 5,
                gender: 'Male',
                firstname: 'Joe',
                lastname: 'Little',
                username: 'jlittle4',
                email: 'jlittle4@va.gov',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '86-(388)973-5323',
                logicalid: '81232be7-10a3-4bcd-95db-fe267f030e5f'
            },
            {
                id: 6,
                gender: 'Female',
                firstname: 'Joyce',
                lastname: 'Gonzalez',
                username: 'jgonzalez5',
                email: 'jgonzalez5@phpbb.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '30-(143)545-3419',
                logicalid: '23a9181f-d826-4528-9835-5f012e4051da'
            },
            {
                id: 7,
                gender: 'Female',
                firstname: 'Lillian',
                lastname: 'Nichols',
                username: 'lnichols6',
                email: 'lnichols6@nationalgeographic.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '46-(653)443-2241',
                logicalid: 'ff57f78c-9a14-4943-b860-dbd5ab0df321'
            },
            {
                id: 8,
                gender: 'Male',
                firstname: 'Earl',
                lastname: 'Perkins',
                username: 'eperkins7',
                email: 'eperkins7@google.es',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '63-(235)939-1038',
                logicalid: 'b300896f-e49d-4406-982d-0dcc5d4cd22d'
            },
            {
                id: 9,
                gender: 'Male',
                firstname: 'Ronald',
                lastname: 'Howell',
                username: 'rhowell8',
                email: 'rhowell8@springer.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '86-(613)492-9066',
                logicalid: '52f63a15-e5e9-49f6-96e4-ba1ae8bbc7f9'
            },
            {
                id: 10,
                gender: 'Female',
                firstname: 'Deborah',
                lastname: 'Davis',
                username: 'ddavis9',
                email: 'ddavis9@shareasale.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '62-(254)596-0255',
                logicalid: '0e3f555c-6ada-4bbe-a834-82c13be2fa78'
            },
            {
                id: 11,
                gender: 'Female',
                firstname: 'Emily',
                lastname: 'Ramos',
                username: 'eramosa',
                email: 'eramosa@telegraph.co.uk',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '1-(585)729-6881',
                logicalid: '5ff030e7-3631-4492-a2bf-ee59ab93f068'
            },
            {
                id: 12,
                gender: 'Female',
                firstname: 'Rebecca',
                lastname: 'Kelley',
                username: 'rkelleyb',
                email: 'rkelleyb@yandex.ru',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '370-(130)357-5490',
                logicalid: '486cd99c-abaa-402d-b29e-3d5fa54ea322'
            },
            {
                id: 13,
                gender: 'Female',
                firstname: 'Annie',
                lastname: 'Lawson',
                username: 'alawsonc',
                email: 'alawsonc@princeton.edu',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '55-(200)642-2194',
                logicalid: '0a7bb3a1-29de-4d2d-8ecb-b45fbc2955c4'
            },
            {
                id: 14,
                gender: 'Male',
                firstname: 'Joe',
                lastname: 'Medina',
                username: 'jmedinad',
                email: 'jmedinad@github.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '66-(465)446-7420',
                logicalid: 'f2282d87-6d79-407d-b9a1-54a530bc11fd'
            },
            {
                id: 15,
                gender: 'Female',
                firstname: 'Theresa',
                lastname: 'King',
                username: 'tkinge',
                email: 'tkinge@amazonaws.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '98-(562)880-6339',
                logicalid: 'b667a18b-5ea0-4862-af86-345a7914923e'
            },
            {
                id: 16,
                gender: 'Female',
                firstname: 'Virginia',
                lastname: 'James',
                username: 'vjamesf',
                email: 'vjamesf@mit.edu',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '420-(863)758-8561',
                logicalid: 'bc7f69d8-09a1-46fe-9001-3c8d87521b5b'
            },
            {
                id: 17,
                gender: 'Male',
                firstname: 'Samuel',
                lastname: 'Tucker',
                username: 'stuckerg',
                email: 'stuckerg@devhub.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '86-(778)324-1449',
                logicalid: '3001e7cd-76df-4f41-bffa-b83da8ff6039'
            },
            {
                id: 18,
                gender: 'Male',
                firstname: 'Juan',
                lastname: 'Cruz',
                username: 'jcruzh',
                email: 'jcruzh@alibaba.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '56-(512)400-4872',
                logicalid: '6642734d-3ed8-4edd-a057-b6775e0350ce'
            },
            {
                id: 19,
                gender: 'Female',
                firstname: 'Kathy',
                lastname: 'Little',
                username: 'klittlei',
                email: 'klittlei@miitbeian.gov.cn',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '86-(886)197-2796',
                logicalid: '954cc1ad-0036-45af-88f4-f7270342cc30'
            },
            {
                id: 20,
                gender: 'Male',
                firstname: 'Brandon',
                lastname: 'Carpenter',
                username: 'bcarpenterj',
                email: 'bcarpenterj@tinyurl.com',
                passstring: 'f927052bfca1cbadaceee849fdbbb717b8df94ab',
                phone: '420-(934)772-9127',
                logicalid: '6236a410-594a-4975-a0e7-5a5e3646842b'
            }
        ];
    }

    function getMockGroups() {
        // jscs:disable
        return {
            status: 'ok',
            info: '',
            groups: [
                {
                    internalId: {
                        $oid: '56b310804d6f637a00020b00'
                    },
                    id: 1,
                    name: 'cum sociis',
                    type: 'public',
                    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC'
                },
                {
                    internalId: {
                        $oid: '56b310804d6f637a00030b00'
                    },
                    id: 2,
                    name: 'ac',
                    type: 'private',
                    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALeSURBVDjLjZNLTxNRGIb5A2Xh0rULjJqw1BCDprXQAuICDBEBE7xFJQY1giCKEARCF9rUljuEFiOIBokFhYIFK6Q2Ei6V3oW21BKFdnq/93VmQomACyd5M+d8Oc9zvjM5kwQg6e/Mzs6myeVywcTExLxUKv09PDzsHBwc1EkkElG/WHRq7/qdgUqlYpCwkITDFosFDocDbrcbPp8PLpcLGs0KRC8aIm3CerGA35S8S7ANfzCZTIjH4wgEAqAkZrMZm5ubiEajiEf9iPh1kMteoqW54nNTY03yjoDamYLD4TCoJxKJgJobjUYQBEFLQ/6fCHpXEAsaMD7ai7rHZWJaQMLHybZjXq+XBjweDy2x2WzQarWg6tFoBD6XFiGvhu4iTOZO+fXYvbs305JIWGi1WkFFp9PREHVmSmS32+lxKOgiBWq4Vgeg7S+A4V0DFrrY6HzEmUxKTU3F/+T2pSOwT1WAWHoPeGxwLg3hUzM3QgvUajX0ej0UCgX6+vpogHqvr6/T9bFXFfi1+BAh6wjs8hb4l98iuqYgu7gapwXUogRESahQNSql54/Boa5BzK+A33QLW1/LoBGXYqn3Gi4X5RP7BFQSsGG+H47lB4gF5uAzliBgKYR7pQqmnlxMymXIzM1b2XeEhKg4OwV2VcU2XIyA+QJc6mroW7lQqRTofD2KzOzcjn9+xItZh7EkLSfbnkFgtRRBSxEIshODiIMZpRLfzE6kn+HGWOyME/RF4vP5wunpaWwQVkxLefg+WoXFsWdYV+bDt1qIrYVK6NvP4odaCfPGJhoFXWBmcDt2biKPx2PUP62TDYxIMNjMBNxr0LbnYarqIL60kru2MKFZ+Ain04nu7m4wWezx9PR0xq6fqba2llFZfb+j/spRhOYECCmfQ9lwGkM3DmFmSgzJmx5wuJwwi8USJuBdgkTyTx4INZakxGRNnLjkCTtSXJBJ5JzLUmflcNpIOG3v+j9k/eSwcE1V7wAAAABJRU5ErkJggg=='
                },
                {
                    internalId: {
                        $oid: '56b310804d6f637a00040b00'
                    },
                    id: 3,
                    name: 'velit',
                    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJRSURBVDjL3VNNaJIBGBaCDnXqVlEQO0ixrE1a26G2uYU0tyVaA2lsHtS5HzuYhTkl0CHZmpT/0coO0UVS6AdrkCPFkC0am+ambea2GjOYuubmN9vG0/eNLl1s0K0XHnh53h8eXp6XBoD2L6D9Jwuqq6v3dnd3X9fr9Rmn0wmNRjMnk8kqSewn8wTFUTWqh+r9YwGTydzd1NTUbzKZkEqlkEgk4Pf7odVqv6jV6kA8Hl+nuGAwCNfgVcSeCjD9XI/xR2xM2ErbaeXl5RcUCsVyNBrNCAQCb2Nj46ZEIoHZbIZKpQKVU5xVWzu+OKzEcvgVkFtANvwMoYHzKUpBv06nIywWi5TL5e6pqanJ+Xw+jI2NIRAIwO12Q9lZQWSiNwuFry+w+O4O8hEPNmeDiDzuIGgMBqNLKpVm7Xb7NT6fP8RisX6y2WzweLxtKDrOIB3RYCsfRD4hQ3r0CqaeiBAebFsaNfPotGNkNDc3TxmNxqzL5Up7PB44HA7I5XLYDEJkIipsESGszQhBzLdiZbIXM47apY/Gc2XbR6TT6btI2WUcDicpFotXe3p6CBKFu3KmdfGD8vdwO4i5y/jxSY1pa91qxFBxuqgPvH0HLk6+URS28gEQSRHW59uwTCqZttXnYwNVR4oa6WHXYVHU24uJ1/fwbaQFa8lWpMdv4LOV9T1mrCr5qxNdt+uBlVnEHlzCcO9BvL/fAL/u1ELYUHl8R1buk5RuFEJWFEZMGNGz4BIfyg2pTpzc8S+0nN1H3BIe3fAZGjbeGuv8L5WMkmK/8AtkdLda3u0iOQAAAABJRU5ErkJggg=='
                },
                {
                    internalId: {
                        $oid: '56b310804d6f637a11140b00'
                    },
                    id: 4,
                    name: 'something',
                    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJRSURBVDjL3VNNaJIBGBaCDnXqVlEQO0ixrE1a26G2uYU0tyVaA2lsHtS5HzuYhTkl0CHZmpT/0coO0UVS6AdrkCPFkC0am+ambea2GjOYuubmN9vG0/eNLl1s0K0XHnh53h8eXp6XBoD2L6D9Jwuqq6v3dnd3X9fr9Rmn0wmNRjMnk8kqSewn8wTFUTWqh+r9YwGTydzd1NTUbzKZkEqlkEgk4Pf7odVqv6jV6kA8Hl+nuGAwCNfgVcSeCjD9XI/xR2xM2ErbaeXl5RcUCsVyNBrNCAQCb2Nj46ZEIoHZbIZKpQKVU5xVWzu+OKzEcvgVkFtANvwMoYHzKUpBv06nIywWi5TL5e6pqanJ+Xw+jI2NIRAIwO12Q9lZQWSiNwuFry+w+O4O8hEPNmeDiDzuIGgMBqNLKpVm7Xb7NT6fP8RisX6y2WzweLxtKDrOIB3RYCsfRD4hQ3r0CqaeiBAebFsaNfPotGNkNDc3TxmNxqzL5Up7PB44HA7I5XLYDEJkIipsESGszQhBzLdiZbIXM47apY/Gc2XbR6TT6btI2WUcDicpFotXe3p6CBKFu3KmdfGD8vdwO4i5y/jxSY1pa91qxFBxuqgPvH0HLk6+URS28gEQSRHW59uwTCqZttXnYwNVR4oa6WHXYVHU24uJ1/fwbaQFa8lWpMdv4LOV9T1mrCr5qxNdt+uBlVnEHlzCcO9BvL/fAL/u1ELYUHl8R1buk5RuFEJWFEZMGNGz4BIfyg2pTpzc8S+0nN1H3BIe3fAZGjbeGuv8L5WMkmK/8AtkdLda3u0iOQAAAABJRU5ErkJggg==',
                    users: [mockUsers[0], mockUsers[1], mockUsers[2]]
                }
            ]
        };
        // jscs:enable
    }

    function getMockGroupWithoutUsersArray() {
        // jscs:disable
        return {
            status: 'ok',
            info: '',
            group: {
                internalId: {
                    $oid: '56b310804d6f637a00020b00'
                },
                id: 1,
                name: 'cum sociis',
                type: 'public',
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC'
            }
        };
    }

    function getMockGroupWithUsersWithoutData() {
        // jscs:disable
        return {
            status: 'ok',
            info: '',
            group: [
                {
                    internalId: {
                        $oid: '56b310804d6f637a00020b00'
                    },
                    id: 1,
                    name: 'cum sociis',
                    type: 'public',
                    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC',
                    users: []
                }
            ]
        };
    }

    function getMockGroupWithUsersWithoutUsersAdded() {
        // jscs:disable
        return {
            status: 'ok',
            info: '',
            group: {
                internalId: {
                    $oid: '56b310804d6f637a00020b00'
                },
                id: 1,
                name: 'cum sociis',
                type: 'public',
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC',
                users: [mockUsers[0], mockUsers[1]]
            }
        };
    }

    function getMockGroupWithUsersWithUsersAdded() {
        // jscs:disable
        return {
            status: 'ok',
            info: '',
            group: {
                internalId: {
                    $oid: '56b310804d6f637a00020b00'
                },
                id: 1,
                name: 'cum sociis',
                type: 'public',
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC',
                users: [mockUsers[0], mockUsers[1], mockUsers[2]]
            }
        };
    }
    function getMockGroupWithAllUsersAdded() {
        // jscs:disable
        return {
            status: 'ok',
            info: '',
            group: {
                internalId: {
                    $oid: '56b310804d6f637a00020b00'
                },
                id: 1,
                name: 'cum sociis',
                type: 'public',
                logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJuSURBVBgZpcH7a05xHMDx9/ecI/OcXWzZRDPCqMlcFqklKZeSwi9spIRcSwrDL5K/QFJLSoTIJX4yJOQ6lkSYjfV4MGwe2549l7Pn+z3nfIz8INlPe72UiDAYFoNkMUgO/WT/njXAEcCmnwQhBAFifMT3EeMj2iDaIMYgWeOHWu90b1w7o8J9u1cCJ9T8BS55+eC6EImAMYSdHXS3f8EKApwwJMhqUl4GuroZfvdBWrRe4wB1qnyyizbQ3g4VFZBOQ1sbNDbiJZPYvk+OCEE2S2cigVtdTd+MSrf43qOjDrBBWpqPE/8+S5WOhdxcKCuDRAKiUWzPwxbBVtA1qZuixaMJXj1mxN2v30SbXfbB+w875HrDJelJVOJ55UopKCgAY+DpU7TnMUQp0mN6yF07m5K5Wwj8J2Hc+7yvtOHlSSUi/OJv3Zwv2j9nFRcvsZcvh7w85PBhemMxsuP7UKvHUThtEenPbfjJkMT7l5mWphcbLf5w6o/1hllda6IfrpkrV/mtsBDH9/GrRlIwdSlB5h05I0bjRGDUvOmRCRVl9UpE+Ju3bEW+aHPJqZq5cMjUKQSxGN+CRgpXzcGyYyhrGBLEwWRoPvsppUSEf6XmLywVbe4wb/LEVHkH5ASSW1WkHKsHZeURGs3b8y19r9/2rlciwv98OFS1V7lDD5SsXBcRfRMVJHnTkEjbyTBlK8Xr1s7tNaeilx0GYFWU1Iysro3oeD2OU0Dz7XTmWVN8x9g+72KOa1Nz6mOSfg4DsGy0stuxhxbz5saP1Ivnnds2nXl/mn84DOBLNH6rN3FnXKYr7bW2fq9bf+LdBf7jJ8/eN9kzWRDgAAAAAElFTkSuQmCC',
                users: [mockUsers[0], mockUsers[1],
                    mockUsers[2], mockUsers[3],
                    mockUsers[4], mockUsers[5],
                    mockUsers[6], mockUsers[7],
                    mockUsers[8], mockUsers[9],
                    mockUsers[10], mockUsers[11],
                    mockUsers[12], mockUsers[13],
                    mockUsers[14], mockUsers[15],
                    mockUsers[16], mockUsers[17],
                    mockUsers[18], mockUsers[19]
                ]
            }
        };
    }

    function getMockGroupWithUsers() {
        // jscs:disable
        return {
            status: 'ok',
            info: '',
            groups: [
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
            ]
        };
        // jscs:enable
    }

    function getFailedMockGroups() {
        return {
            status: 'failed',
            info: 'Unable to retrieve data from database'
        };
    }

    function getCrashedMockGroups() {
        return undefined;
    }

    function getMockEmptyGroups() {
        return {
            status: 'ok',
            info: '',
            groups: []
        };
    }
})();
