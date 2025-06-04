import AnimatedCounter from "../components/AnimatedCounter";

const StatsSection = () => {
  const stats = [
    { id: 1, name: "Resumes Analyzed", value: 12500 },
    { id: 2, name: "Interview Rate Increase", value: 87, suffix: "%" },
    { id: 3, name: "Users Hired", value: 4200 },
    { id: 4, name: "Countries", value: 45 },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter target={stat.value} />
                {stat.suffix}
              </p>
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                {stat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
