import _ from 'lodash';

const parsePokemonName = (name: string): string => _.upperFirst(name).replace(/-/g, ' ');

export default parsePokemonName;
