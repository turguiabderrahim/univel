
const data = [
    {
        name: 'Seed',
        percentage: 14,
        value: 70,
        color: '#0789F8',
    },
    {
        name: 'Public Sale',
        percentage: 14,
        value: 70,
        color: '#90be6d',
    },
    {
        name: 'Advisory',
        percentage: 5,
        value: 40,
        color: '#f48c06',
    },
    {
        name: 'Liquidity',
        percentage: 14,
        value: 60,
        color: '#b5179e',
    },
    {
        name: 'Treasury',
        percentage: 14,
        value: 80,
        color: '#34a0a4',
    },
    {
        name: 'Team',
        percentage: 5,
        value: 50,
        color: '#001a72',
    },
    {
        name: 'Marketing',
        percentage: 14,
        value: 60,
        color: '#895737',
    },
    {
        name: 'Airdrop',
        percentage: 14,
        value: 70,
        color: '#a594f9',
    },
    {
        name: 'NFT Ecosystem',
        percentage: 5,
        value: 70,
        color: '#c5283d',
    },
];

const svg = d3
    .select('svg');


const viewBox = svg.attr('viewBox');
const regexViewBox = /\d+ \d+ (\d+) (\d+)/;

const [, viewBoxWidth, viewBoxHeight] = viewBox.match(regexViewBox).map(item => Number.parseInt(item, 10));


const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
};

const width = viewBoxWidth - (margin.left + margin.right);
const height = viewBoxHeight - (margin.top + margin.bottom);

const radius = Math.min(width, height) / 2;

const strokeWidth = 20;

const group = svg
    .append('g')
    .attr('transform', `translate(${margin.left} ${margin.top})`);

const groupDefault = group
    .append('g')
    .attr('transform', `translate(${width / 2} ${height / 2})`);
groupDefault
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', radius)
    .attr('transform', 'rotate(-90)')
    .attr('fill', 'none')
    .attr('stroke', 'hsla(0, 0%, 0%, 0.08')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-linecap', 'round')
    .attr('stroke-dasharray', radius * 3.14 * 2)
    .attr('stroke-dashoffset', radius * 3.14 * 2);

const pie = d3
    .pie()
    .sort(null)
    .padAngle(0.12)

    .value(d => d.value);

const arc = d3
    .arc()
    .innerRadius(radius)
    .outerRadius(radius);


const groupArcs = group
    .append('g')
    .attr('transform', `translate(${width / 2} ${height / 2})`);

const groupsArcs = groupArcs
    .selectAll('g')
    .data(pie(data))
    .enter()
    .append('g');

groupsArcs
    .append('path')
    .attr('d', arc)
    .attr('fill', 'none')
    .attr('stroke', d => d.data.color)
    .attr('stroke-width', strokeWidth * 0.6)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-dasharray', radius * 3.14 * 2)
    .attr('stroke-dashoffset', radius * 3.14 * 2);


groupDefault
    .select('circle')
    .transition()
    .ease(d3.easeExp)
    .delay(200)
    .duration(2000)
    .attr('stroke-dashoffset', '0')
    .on('end', () => {
        const paths = document.querySelectorAll('svg g g path');
        paths.forEach((path) => {
            const length = path.getTotalLength();
            path.setAttribute('stroke-dasharray', length);
            path.setAttribute('stroke-dashoffset', length);
        });

        const duration = 1000;
        d3
            .selectAll('svg g g path')
            .transition()
            .ease(d3.easeLinear)
            .delay((d, i) => i * duration)
            .duration(duration)
            .attr('stroke-dashoffset', 0);

        d3
            .selectAll('svg g g line')
            .transition()
            .ease(d3.easeLinear)
            .delay((d, i) => i * duration + duration / 2.5)
            .duration(duration / 3)
            .attr('stroke-dashoffset', 0);

        d3
            .selectAll('svg g g text')
            .transition()
            .ease(d3.easeLinear)
            .delay((d, i) => i * duration + duration / 2)
            .duration(duration / 2)
            .style('opacity', 1)
            .style('visibility', 'visible');
    });


$(".selectArea img").on('mouseover',function() {
    let value = $(this).attr("id");

    for(i=1;i<=3;i++) {
        $("#s-"+i).addClass("blur");
        if(value=='s-'+i) {
            $("#s-"+i).removeClass("blur");
        }

    }

})

$(".selectArea img").on('mouseout',function() {

    $(".selectArea img").removeClass("blur");
})
