import type { NewsSource } from '../../../types/newsTypes';
import './sources.css';

class Sources {
    draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error('Template #sourceItemTemp was not found');
        }

        data.forEach((item) => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);

            const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');

            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');

            if (!sourceName || !sourceItem) {
                throw new Error('Source template is missing required elements');
            }


            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (!sourcesContainer) {
            throw new Error('Container .sources was not found');
        }
        
        sourcesContainer.append(fragment);
    }
}

export default Sources;
