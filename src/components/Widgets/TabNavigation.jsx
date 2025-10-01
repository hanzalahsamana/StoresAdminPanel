import { useState } from 'react';

const TabNavigation = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const activeContent = tabs.find((tab) => tab.title === activeTab)?.content;
  const isHtml = tabs.find((tab) => tab.title === activeTab)?.isHtml;

  return (
    <div className="bg-[var(--tmp-pri)] p-5 w-full">
      {/* Tab Headers */}
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            onClick={() => setActiveTab(tab.title)}
            className={`py-1 font-semibold border-b-2 ${activeTab === tab.title ? 'border-[var(--tmp-txt)] text-[var(--tmp-txt)]' : 'border-transparent text-[var(--tmp-ltxt)]'}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 text-sm text-[var(--tmp-ltxt)]">{isHtml ? <div dangerouslySetInnerHTML={{ __html: activeContent }} /> : <div>{activeContent}</div>}</div>
    </div>
  );
};

export default TabNavigation;
