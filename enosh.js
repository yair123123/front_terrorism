const routes = {
    get_most_deadly: ['top-5-container'],
    average_casualties: ['top-5-container'],
    get_top_5_most_num_spread: [],
    get_most_group_active_by_region: ['area-container'],
    get_history_events_by_year: ['year-container'],
    get_groups_with_common_goal_by_location: ['area-container'],
    get_unique_groups_by_location: ['area-container'],
    get_shared_goals_in_groups_by_year: ['year-container'],
    get_shared_attack_type_in_groups_by_location: ['area-container'],
    Search_in_text: [],
}

document.getElementById("stats").addEventListener("change", ({ target: { value } }) => {
    [...document.getElementsByClassName("inputs-container")].forEach(node => {
        node.style['display'] = routes[value].includes(node.id) ? 'flex' : 'none'
    })
})

const isDisplay = (n) => window.getComputedStyle(n)['display'] !== 'none'

const isNodeType = (...types) => node => types.includes(node.nodeName)

const nodesToJson = (obj, n) => ({ ...obj, [n.id]: n.type === 'checkbox' ? n.checked : n.value })


const extractFormValues = () => [...document.getElementsByClassName('inputs-container')]
    .filter(isDisplay)
    .flatMap(n => [...n.childNodes].filter(isNodeType('INPUT', 'SELECT')))
    .reduce(nodesToJson, {})

const enoshClick = () => {
    console.log(extractFormValues());
}

