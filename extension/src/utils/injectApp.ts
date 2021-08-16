import { INJECTABLE_PAGES } from '../constants/global';

export const isElement = (node: Node): node is Element => node.nodeType === 1;

export const inject = (element: HTMLElement): boolean => {
    const mainContent = document.querySelector('#main-content > div');
    if (!mainContent) return false;

    mainContent.prepend(element);
    return true;
};

export const shouldInjectApp = (url?: string): boolean => {
    if (!url) return false;

    try {
        const parsedUrl = new URL(url);
        const { pathname } = parsedUrl;
        return INJECTABLE_PAGES.some((path) =>
            new RegExp(`/${path}`).test(pathname)
        );
    } catch (e) {
        return false;
    }
};

export class DOMElementAddedObserver {
    private observer: MutationObserver;
    private hasBeenFound: boolean;

    constructor(
        private target: Node,
        private hasElementBeenAdded: (node: Node) => boolean,
        private onElementAdded: (node: Node) => void
    ) {
        this.hasBeenFound = false;
        this.observer = new MutationObserver((mutations) => {
            mutations.every((mutation) => {
                if (this.hasBeenFound) return true;
                if (!mutation.addedNodes) return false;

                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];

                    if (this.hasElementBeenAdded(node)) {
                        this.onElementAdded(node);
                        this.disconnect();
                        this.hasBeenFound = true;
                        break;
                    }
                }

                return this.hasBeenFound;
            });
        });
    }

    observe() {
        this.hasBeenFound = false;
        this.observer.observe(this.target, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false,
        });
    }

    disconnect() {
        this.observer.disconnect();
    }
}
