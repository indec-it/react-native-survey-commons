import cleanChildrenQuestions from './cleanChildrenQuestions';

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
    const section = chapter.root ? entity : entity[chapter.name];
    return cleanChildrenQuestions(chapter.rows, Object.assign(section, answer));
};

export {getSection};
export {handleChangeAnswer};
