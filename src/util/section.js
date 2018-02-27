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
    const section = cleanChildrenQuestions(
        chapter.rows,
        Object.assign(chapter.root ? entity : entity[chapter.name], answer)
    );
    return chapter.root ? section : Object.assign({}, entity, {[chapter.name]: section});
};

export {getSection};
export {handleChangeAnswer};
