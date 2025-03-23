javascript: (async () => {
    const csv = this.csv = this.csv || await new Promise(async res => {
        const Papa = await new Promise(async (res, define) => {
            define = (_, Papa) => res(Papa());
            define.amd = true;
            eval(await (await fetch('https://unpkg.com/papaparse@5.5.2/papaparse.min.js')).text());
        });
        const input = document.createElement('input');
        input.type = 'file';
        const filePromise = new Promise(res => (input.onchange = () => res(input.files[0])));
        input.click();
        const file = await filePromise;
        const csv = await new Promise(res => Papa.parse(file, {
            header: true,
            complete: res
        }));
        res(csv.data);
    });
    const json = this.json = this.json || await new Promise(async res => {
        const js = await (await fetch('https://hoang014119.github.io/jp/src/json/json.js')).text();
        const jsonData = eval(js.split(' ')[3].split(';')[0]);
        res(JSON.parse(unescape(jsonData)));
    });
    const jsonAll = JSON.parse(JSON.stringify(json)).reduce((a, b) => a.concat(b));
    console.log('csv', csv);
    console.log('json', json);
    console.log('csv', csv[0]);
    console.log('json', jsonAll[0]);
    const map = csv => csv.map((i, o) => (o = jsonAll.find(j => i.kanji == j.kanji)) || console.log(i) || o);
    const jsonN0 = json.map(x => x.filter(i => csv.every(j => i.kanji != j.kanji)));
    console.log('jsonN0', jsonN0);
    const jsonMapped = Array(5).fill().map((x, i) => csv.filter(row => row.level == 'N' + (5 - i))).map(map).reverse();
    jsonMapped[0].push(...jsonN0.reduce((a, b) => a.concat(b)));
    console.log('jsonMapped', jsonMapped);
    const a = document.createElement('a');
    a.download = 'json.json';
    a.href = URL.createObjectURL(new Blob([JSON.stringify(jsonMapped)]));
    a.click();
    a.remove();
})