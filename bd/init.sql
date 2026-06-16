
CREATE TABLE system_users(id INT PRIMARY KEY AUTO_INCREMENT,username VARCHAR(60) NOT NULL UNIQUE,email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, role ENUM('user','admin') NOT NULL);

INSERT INTO system_users(username ,email, password, role) VALUES ("admin","gabrielpedro9375@gmail.com","123","admin");

CREATE TABLE agents(id INT PRIMARY KEY AUTO_INCREMENT, model VARCHAR(100) NOT NULL, manufacturer VARCHAR(100) NOT NULL, os ENUM('linux','windows'), mac VARCHAR(20) NOT NULL UNIQUE, architecture VARCHAR(20) NOT NULL, processor VARCHAR(20) NOT NULL INT, release_version VARCHAR(50) NOT NULL, status ENUM('up','down'));
ALTER TABLE agents ADD COLUMN processor VARCHAR(20) NOT NULL INT AFTER architecture;

CREATE TABLE systemLevelMetrics(id INT PRIMARY KEY AUTO_INCREMENT, agent_id INT NOT NULL, ip_address VARCHAR(20) NOT NULL, cpu_usage FLOAT, physical_core_count TINYINT UNSIGNED, logical_core_count TINYINT UNSIGNED, battery_percentage FLOAT, boot_time FLOAT, username VARCHAR(60), timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(agent_id)REFERENCES agents(id) ON DELETE CASCADE);

CREATE TABLE cpu_times(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, user FLOAT, nice FLOAT, system_time FLOAT, idle FLOAT, iowait FLOAT, irq FLOAT, FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE cpu_stats(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, ctx_switches BIGINT, interrupts BIGINT, soft_interrupts BIGINT, syscalls BIGINT, FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE cpu_frequency(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, current FLOAT, min FLOAT, max FLOAT, FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE cpu_avg_system_load(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL,one_min FLOAT, five_min FLOAT, fifteen_min FLOAT, FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE disk_partitions(id INT PRIMARY KEY AUTO_INCREMENT, agent_id INT NOT NULL,device VARCHAR(255), mountpoint VARCHAR(255), fstype VARCHAR(50), last_updated DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(agent_id)REFERENCES agents(id) ON DELETE CASCADE);

CREATE TABLE virtualMemory (id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, total INT , available INT, percent FLOAT, used INT, free INT, active INT, inactive INT, buffers INT, cached INT, shared INT, slab INT,
FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE swapMemoryStats (id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, total INT, used INT, percent FLOAT,
FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE );

CREATE TABLE diskUsage(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, total INT, used INT, free INT, percent FLOAT,
FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE );

CREATE TABLE netIOCounters (id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, bytes_sent INT , bytes_recv INT, packets_sent INT, packets_recv INT, errin INT, errout INT, dropin INT, dropout INT,
FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE );

CREATE TABLE speed_test_data(id INT PRIMARY KEY AUTO_INCREMENT, download FLOAT , upload FLOAT, ping FLOAT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE net_io_counters_network(id INT PRIMARY KEY AUTO_INCREMENT, bytes_sent INT , bytes_recv INT, packets_sent INT, packets_recv INT, errin INT, errout INT, dropin INT, dropout INT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE divices(id INT PRIMARY KEY AUTO_INCREMENT, ip_address VARCHAR(20), mac_address VARCHAR(20), name VARCHAR(60), state ENUM('up','down'), timestamp DATETIME);

CREATE TABLE router_data(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(60), description VARCHAR(255), location VARCHAR(60), objectId VARCHAR(60), uptime INT, timeSinceLastChange INT, numberOfInterfaces INT, timestamp DATETIME CURRENT_TIMESTAMP);

CREATE TABLE router_interfaces(id INT PRIMARY KEY AUTO_INCREMENT, router_id INT NOT NULL, name VARCHAR(60), type VARCHAR(60), maxPacketSize INT, speed INT, status INT, lastChange INT, octetsReceived INT, packetsDelivered INT, errors INT, discartedPackets INT , FOREIGN KEY(router_id)REFERENCES router_data(id) ON DELETE CASCADE);

CREATE TABLE alerts(id INT PRIMARY KEY AUTO_INCREMENT,agent_id INT, level INT CHECK (level >= 1 AND level <= 10), type VARCHAR(60), descripton VARCHAR(225), status TINYINT(1), timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(agent_id)REFERENCES agents(id) ON DELETE CASCADE);

CREATE TABLE daily_events( id INT PRIMARY KEY AUTO_INCREMENT, type VARCHAR(60), description VARCHAR(225) ,timestamp DATETIME DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE manutention_device_register ( id INT PRIMARY KEY AUTO_INCREMENT, serial_number VARCHAR(60) ,name VARCHAR(60), model VARCHAR(60), category VARCHAR(60), manufacturer VARCHAR(60), state VARCHAR(60), device_ip VARCHAR(20), device_mac VARCHAR(60) ,timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)

CREATE TABLE agents(id INT PRIMARY KEY AUTO_INCREMENT, model VARCHAR(100) NOT NULL, manufacturer VARCHAR(100) NOT NULL, os ENUM('linux','windows'), mac VARCHAR(20) NOT NULL UNIQUE, architecture VARCHAR(20) NOT NULL, release_version VARCHAR(50) NOT NULL, status ENUM('up','down'));

CREATE TABLE systemLevelMetrics(id INT PRIMARY KEY AUTO_INCREMENT, agent_id INT NOT NULL, ip_address VARCHAR(20) NOT NULL, cpu_usage FLOAT, physical_core_count TINYINT UNSIGNED, logical_core_count TINYINT UNSIGNED, battery_percentage FLOAT, boot_time FLOAT, username VARCHAR(60), timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(agent_id)REFERENCES agents(id) ON DELETE CASCADE);


CREATE TABLE cpu_times(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, user FLOAT, nice FLOAT, system_time FLOAT, idle FLOAT, iowait FLOAT, irq FLOAT, FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE cpu_stats(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, ctx_switches BIGINT, interrupts BIGINT, soft_interrupts BIGINT, syscalls BIGINT, FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE cpu_frequency(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, current FLOAT, min FLOAT, max FLOAT, FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE cpu_avg_system_load(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL,one_min FLOAT, five_min FLOAT, fifteen_min FLOAT, FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE disk_partitions(id INT PRIMARY KEY AUTO_INCREMENT, agent_id INT NOT NULL,device VARCHAR(255), mountpoint VARCHAR(255), fstype VARCHAR(50), last_updated DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(agent_id)REFERENCES agents(id) ON DELETE CASCADE);

# ---------------------------------------------------------------------

CREATE TABLE virtualMemory (id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, total INT , available INT, percent FLOAT, used INT, free INT, active INT, inactive INT, buffers INT, cached INT, shared INT, slab INT,
FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE);

CREATE TABLE swapMemoryStats (id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, total INT, used INT, percent FLOAT,
FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE );

CREATE TABLE diskUsage(id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, total INT, used INT, free INT, percent FLOAT,
FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE );

CREATE TABLE netIOCounters (id INT PRIMARY KEY AUTO_INCREMENT, systemLevelMetrics_id INT NOT NULL, bytes_sent INT , bytes_recv INT, packets_sent INT, packets_recv INT, errin INT, errout INT, dropin INT, dropout INT,
FOREIGN KEY(systemLevelMetrics_id)REFERENCES systemLevelMetrics(id) ON DELETE CASCADE );

#---------------------------------------------------------------------





CREATE TABLE speed_test_data(id INT PRIMARY KEY AUTO_INCREMENT, download FLOAT , upload FLOAT, ping FLOAT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE net_io_counters_network(id INT PRIMARY KEY AUTO_INCREMENT, bytes_sent INT , bytes_recv INT, packets_sent INT, packets_recv INT, errin INT, errout INT, dropin INT, dropout INT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE divices(id INT PRIMARY KEY AUTO_INCREMENT, ip_address VARCHAR(20), mac_address VARCHAR(20), name VARCHAR(60), state ENUM('up','down'), timestamp DATETIME);

CREATE TABLE router_data(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(60), description VARCHAR(255), location VARCHAR(60), objectId VARCHAR(60), uptime INT, timeSinceLastChange INT, numberOfInterfaces INT, timestamp DATETIME CURRENT_TIMESTAMP);

CREATE TABLE router_interfaces(id INT PRIMARY KEY AUTO_INCREMENT, router_id INT NOT NULL, name VARCHAR(60), type VARCHAR(60), maxPacketSize INT, speed INT, status INT, lastChange INT, octetsReceived INT, packetsDelivered INT, errors INT, discartedPackets INT , FOREIGN KEY(router_id)REFERENCES router_data(id) ON DELETE CASCADE);

CREATE TABLE alerts(id INT PRIMARY KEY AUTO_INCREMENT,agent_id INT, level INT CHECK (level >= 1 AND level <= 10), type VARCHAR(60), descripton VARCHAR(225), status TINYINT(1), timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(agent_id)REFERENCES agents(id) ON DELETE CASCADE);

CREATE TABLE daily_events( id INT PRIMARY KEY AUTO_INCREMENT, type VARCHAR(60), description VARCHAR(225) ,timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE manutention_device_register ( id INT PRIMARY KEY AUTO_INCREMENT, serial_number VARCHAR(60) ,name VARCHAR(60), model VARCHAR(60), category VARCHAR(60), manufacturer VARCHAR(60), state VARCHAR(60), device_ip VARCHAR(20), device_mac VARCHAR(60) ,timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)
