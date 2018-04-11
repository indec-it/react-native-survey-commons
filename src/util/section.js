import cleanChildrenQuestions from './cleanChildrenQuestions';
import isSectionValid from './isSectionValid';

const getSection = (entity, chapter) => {
    if (chapter.root) {
        return entity;
    }
    if (!entity[chapter.name]) {
        Object.assign(entity, {[chapter.name]: {}});
    }
    return entity[chapter.name];
};

const handleChangeAnswer = (entity, chapter, answer) => {
    const section = cleanChildrenQuestions(
        chapter.rows,
        Object.assign(chapter.root ? entity : entity[chapter.name], answer)
    );
    return chapter.root ? section : Object.assign({}, entity, {[chapter.name]: section});
};

const setSectionValidity = (entity, chapter) => {
    const section = getSection(entity, chapter);
    Object.assign(
        section,
        {valid: isSectionValid(section, chapter.rows, entity)}
    );
    return section.valid;
};

export {getSection};
export {handleChangeAnswer};
export {setSectionValidity};
